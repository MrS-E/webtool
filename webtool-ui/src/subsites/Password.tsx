import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Popup from "../components/PopUp.tsx";
import Form from "../components/Form.tsx";
import FormInput from "../components/FormInput.tsx";
//@ts-ignore
import * as crypt from "crypto-js";

function Password() : JSX.Element {
    const navigate = useNavigate()
    const [cookies, ] = useCookies(["token"])
    const [pwd, setPwd] = useState<Object[]>([])
    const [search, setSearch] = useState<string>()
    const [detailTrigger, setDetailTrigger] = useState<boolean>(false)
    const [addTrigger, setAddTrigger] = useState<boolean>(false)
    const [add, setAdd] = useState({name:"", username:"", email:"", tel:"", desc:"", password:""})


    useEffect(() => {
        fetch("http://localhost:3000/passwords", {mode: "cors", method: "GET", headers: {"authorization": cookies.token}})
            .then(res =>res.status===401?navigate("/login"):res.json())
            .then(res => setPwd(res))
            .catch()
    }, []);

    const handleAdd = () => {
        const master = window.prompt("Please provide your master password", "secret")
        console.log(add)
        fetch("http://localhost:3000/passwords", {mode: "cors", method: "POST", headers: {"authorization": cookies.token, "Content-Type": "application/json"}, body: JSON.stringify({...add, password: crypt.AES.encrypt(add.password, master).toString()})})
            .then(res =>res.status===401?navigate("/login"):res.json())
            .catch()
            .finally(()=>window.location.reload())
    }

    return (
        <>
            <div>
                <h1>Passwort-Manager</h1>
                <div>
                    <input type={"text"} onChange={e=>setSearch(e.target.value)} value={search}/>
                    <button>search</button>
                </div>
                <button onClick={()=>setAddTrigger(true)}>add</button>
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
                    {pwd?.map((e:any, index:number) => {
                        return (
                            <tr id={e.id} key={"pwd_"+index}>
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
            </Popup>
            <Popup trigger={addTrigger} changeTrigger={setAddTrigger}>
                <h2>Hinzufügen</h2>
                <hr/>
                <Form button={"hinzufügen"} action={handleAdd}>
                    <FormInput name={"name"} label={"Webseite"} type={"text"} value={(v:string)=>{setAdd({...add, name: v})}}/>
                    <FormInput name={"user"} label={"Nutzername"} type={"text"} value={(v:string)=>{setAdd({...add, username: v})}}/>
                    <FormInput name={"email"} label={"E-Mail"} type={"email"} value={(v:string)=>{setAdd({...add, email: v})}}/>
                    <FormInput name={"tel"} label={"Telefon"} type={"tel"} value={(v:string)=>{setAdd({...add, tel: v})}}/>
                    <FormInput name={"note"} label={"Notiz"} type={"text"} value={(v:string)=>{setAdd({...add, desc: v})}}/>
                    <FormInput name={"pwd"} label={"Passwort"} type={"password"} value={(v:string)=>{setAdd({...add, password: v})}}/>
                </Form>
            </Popup>
        </>
    );
}

export default Password;