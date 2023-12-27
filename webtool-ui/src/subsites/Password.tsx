import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Popup from "../components/PopUp.tsx";
import Form from "../components/Form.tsx";
import FormInput from "../components/FormInput.tsx";
import crypt from "crypto-js";
import {server} from "../variables.ts";

function Password(): JSX.Element {
    const navigate = useNavigate()
    const [cookies,] = useCookies(["token"])
    const [pwd, setPwd] = useState<Object[]>([])
    const [search, setSearch] = useState<string>()
    const [detailTrigger, setDetailTrigger] = useState<boolean>(false)
    const [addTrigger, setAddTrigger] = useState<boolean>(false)
    const [add, setAdd] = useState({name: "", username: "", email: "", tel: "", desc: "", password: ""})
    const [detail, setDetail] = useState/*<{id: string, name: string, email: string, username: string, telephone: string, description: string, password: string, authorId: string, createdAt: string, updatedAt: string }>*/({authorId: "", createdAt: "", description: "", email: "", id: "", name: "", password: "", telephone: "", updatedAt: "", username: ""})
    const [reload, setReload] = useState<number>(0)
    const [update, setUpdate] = useState<boolean>(false)
    const [master, setMaster] = useState<crypt.lib.WordArray>(crypt.enc.Utf8.parse(crypt.MD5("secret").toString()))
    const iv: crypt.lib.WordArray = crypt.enc.Utf8.parse("1234567890123456")

    useEffect(() => {
        setMaster(crypt.enc.Utf8.parse(crypt.MD5(window.prompt("Please provide your master password", "secret") as string).toString()))
    }, []);
    useEffect(() => {
        fetch(server+"/passwords", {mode: "cors", method: "GET", headers: {"authorization": cookies.token}})
            .then(res => res.status === 401 ? navigate("/login") : res.json())
            .then(res => setPwd(res))
            .catch()
            .finally(() => setReload(0))

    }, [reload]);

    const handleAdd = () => {
        fetch(server+"/passwords?rand" + Math.random(), {mode: "cors", method: "POST", headers: {"authorization": cookies.token, "Content-Type": "application/json"}, body: JSON.stringify({...add, password: encrypt(add.password)})})
            .then(res => res.status === 401 ? navigate("/login") : res.json())
            .catch()
            .finally(() => {
                setReload(reload + 1);
                setAddTrigger(false)
            })

    }

    const handleDetail = (e: Event) => {
        // @ts-ignore
        fetch(server+"/passwords/" + e.currentTarget["id"] + "?rand" + Math.random(), {mode: "cors", method: "GET", headers: {"authorization": cookies.token}})
            .then(res => res.status === 401 ? navigate("/login") : res.json())
            .then(async res => {
                console.log(res)
                console.log({...res, password: decrypt(res.password)})
                setDetail({...res, password: decrypt(res.password)}) //fixme somehow password is always "" even if it's correctly decrypted in line 53; update somehow without any fix it works again, i don't understand how or why
                console.log(detail)
            })
            .catch()
            .finally(() => setDetailTrigger(true))
    }

    const handleSearch = () => {
        if (search == "") return setReload(reload + 1)
        setPwd(pwd.filter((e: any) => e.name.includes(search) || e.username.includes(search) || e.email.includes(search) || e.telephone.includes(search)))
    }
    const handleUpdate = () => {
        // @ts-ignore
        fetch(server+"/passwords/" + detail?.id, {mode: "cors", method: "PUT", headers: {"authorization": cookies.token, "Content-Type": "application/json"}, body: JSON.stringify({...detail, password: encrypt(detail?.password)})})
            .then(res => res.status === 401 ? navigate("/login") : res.json())
            .catch()
            .finally(() => {
                setReload(reload + 1);
                setDetailTrigger(false);
                setUpdate(false)
            })
    }

    const encrypt = (passwd: string): string => crypt.AES.encrypt(passwd, master, {iv: iv}).toString()
    const decrypt = (passwd: string): any => crypt.AES.decrypt(passwd, master, {iv: iv}).toString(crypt.enc.Utf8)

    return (
        <>
            <div>
                <h1>Passwort-Manager</h1>
                <div>
                    <label>Search</label>
                    <input type={"text"} onChange={e => setSearch(e.target.value)} value={search} onClick={(e) => {
                        e.currentTarget.value = ""
                        setSearch("")
                    }}/>
                    <button onClick={handleSearch}>search</button>
                    <button onClick={() => setAddTrigger(true)}>add</button>
                </div>
                <hr/>
                <table>
                    <thead>
                    <tr>
                        <th>Webseite</th>
                        <th>Nutzername</th>
                        <th>Email</th>
                        <th>Telefon</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pwd?.map((e: any, index: number) => {
                        return (
                            // @ts-ignore
                            <tr id={e.id} key={"pwd_" + index} onClick={handleDetail}>
                                <td>{e.name}</td>
                                <td>{e.username}</td>
                                <td>{e.email}</td>
                                <td>{e.telephone}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <Popup trigger={detailTrigger} changeTrigger={setDetailTrigger}>
                <h2>Detail</h2>
                <hr/>
                <button style={update ? {display: "none"} : {}} onClick={() => {
                    fetch(server+"/passwords/" + detail?.id, {mode: "cors", method: "DELETE", headers: {"authorization": cookies.token}})
                        .finally(() => {
                            setReload(reload + 1);
                            setDetailTrigger(false)
                        })
                }}>Löschen
                </button>
                <button style={update ? {display: "none"} : {}} onClick={() => {
                    setUpdate(true)
                }}
                >Bearbeiten
                </button>
                <hr/>
                <div style={update ? {display: "none"} : {}}>
                    {detail?.name ? <p><strong>Webseite:</strong>{detail.name}</p> : <></>}
                    {detail?.email ? <p><strong>E-Mail:</strong>{detail.email}</p> : <></>}
                    {detail?.username ? <p><strong>Nutzername:</strong>{detail.username}</p> : <></>}
                    {detail?.telephone ? <p><strong>Telefon:</strong>{detail.telephone}</p> : <></>}
                    {detail?.description ? <p><strong>Notiz:</strong>{detail.description}</p> : <></>}
                    {detail?.password ? <p><strong>Passwort:</strong>{detail.password}</p> : <></>}
                </div>
                <div style={!update ? {display: "none"} : {}}>
                    <Form button={"Bearbeiten"} action={handleUpdate}>
                        <FormInput in={detail?.name} name={"name"} label={"Webseite"} type={"text"} required={true}
                                   value={(v: string) => {
                                       setDetail({...detail, name: v})
                                   }}/>
                        <FormInput in={detail?.username} name={"user"} label={"Nutzername"} type={"text"}
                                   value={(v: string) => {
                                       setDetail({...detail, username: v})
                                   }}/>
                        <FormInput in={detail?.email} name={"email"} label={"E-Mail"} type={"email"}
                                   value={(v: string) => {
                                       setDetail({...detail, email: v})
                                   }}/>
                        <FormInput in={detail?.telephone} name={"tel"} label={"Telefon"} type={"tel"}
                                   value={(v: string) => {
                                       setDetail({...detail, telephone: v})
                                   }}/>
                        <FormInput in={detail?.description} name={"note"} label={"Notiz"} type={"text"}
                                   value={(v: string) => {
                                       setDetail({...detail, description: v})
                                   }}/>
                        <FormInput in={detail?.password} name={"pwd"} label={"Passwort"} type={"password"}
                                   required={true} value={(v: string) => {
                            setDetail({...detail, password: v})
                        }}/>
                    </Form>
                </div>

            </Popup>
            <Popup trigger={addTrigger} changeTrigger={setAddTrigger}>
                <h2>Hinzufügen</h2>
                <hr/>
                <Form button={"hinzufügen"} action={handleAdd}>
                    <FormInput name={"name"} label={"Webseite"} type={"text"} required={true} value={(v: string) => {
                        setAdd({...add, name: v})
                    }}/>
                    <FormInput name={"user"} label={"Nutzername"} type={"text"} value={(v: string) => {
                        setAdd({...add, username: v})
                    }}/>
                    <FormInput name={"email"} label={"E-Mail"} type={"email"} value={(v: string) => {
                        setAdd({...add, email: v})
                    }}/>
                    <FormInput name={"tel"} label={"Telefon"} type={"tel"} value={(v: string) => {
                        setAdd({...add, tel: v})
                    }}/>
                    <FormInput name={"note"} label={"Notiz"} type={"text"} value={(v: string) => {
                        setAdd({...add, desc: v})
                    }}/>
                    <FormInput name={"pwd"} label={"Passwort"} type={"password"} required={true} value={(v: string) => {
                        setAdd({...add, password: v})
                    }}/>
                </Form>
            </Popup>
        </>
    );
}

export default Password;
