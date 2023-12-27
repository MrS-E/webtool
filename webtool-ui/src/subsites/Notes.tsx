import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Popup from "../components/PopUp.tsx";
import Form from "../components/Form.tsx";
import FormInput from "../components/FormInput.tsx";
import {server} from "../variables.ts";
import "./Notes.css"

//@ts-ignore

function Note(): JSX.Element {
    const navigate = useNavigate()
    const [cookies,] = useCookies(["token"])
    const [node, setNote] = useState<Object[]>()
    const [addTrigger, setAddTrigger] = useState<boolean>(false)
    const [add, setAdd] = useState({name: "", description: ""})
    const [reload, setReload] = useState(0)
    const [update, setUpdate] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState({id: "", update: {name: "", description: ""}})

    useEffect(() => {
        fetch(server+"/notes", {mode: "cors", method: "GET", headers: {"authorization": cookies.token}})
            .then(res => res.status === 401 ? navigate("/login") : res.json())
            .then(res => setNote([...res]))
            .catch()
            .finally(() => setReload(0))

    }, [reload]);

    const handleAdd = () => {
        fetch(server+"/notes", {mode: "cors", method: "POST", headers: {"authorization": cookies.token, "Content-Type": "application/json"}, body: JSON.stringify(add)})
            .then(res => res.status === 401 ? navigate("/login") : res.json())
            .catch()
            .finally(() => {
                setReload(reload + 1);
                setAddTrigger(false)
            })
    }

    const handleUpdate = () => {
        fetch(server+"/notes/" + updateData.id, {mode: "cors", method: "PUT", headers: {"authorization": cookies.token, "Content-Type": "application/json"}, body: JSON.stringify(updateData.update)})
            .then(res => res.status === 401 ? navigate("/login") : res.json())
            .catch()
            .finally(() => {
                setReload(reload + 1);
                setUpdate(false)
            })
    }

    return (
        <>
            <div className={"container"}>
                <h1>Notes</h1>
                <button onClick={() => setAddTrigger(true)}>add</button>
                <hr/>
                <div className={"note-container"} >
                    {node?.map((e: any, index: number) => {
                        return (
                            <div key={"node" + index + "_" + e.id} className={"note"}>
                                <button style={update&&updateData.id==e.id ? {display: "none"} : {}}
                                        onClick={() => {
                                            fetch(server+"/notes/" + e.id, {mode: "cors", method: "DELETE", headers: {"authorization": cookies.token}})
                                                .finally(() => {
                                                    setReload(reload + 1)
                                                })
                                        }}>Löschen</button>
                                <button className={"edit"} style={update&&updateData.id==e.id ? {display: "none"} : {}}
                                        onClick={() => {
                                            setUpdateData({update: {name: e.name, description: e.description}, id: e.id})
                                            setUpdate(true)
                                        }}>Bearbeiten</button>
                                <div style={update&&updateData.id==e.id ? {display: "none"} : {}}>
                                    <h4>{e.name}</h4>
                                    <p>{e.description}</p>
                                </div>
                                <div style={update&&updateData.id==e.id ? {width: "25vw"} : {display: "none"}}> {/*fixme small screen form overflow*/}
                                    <Form button={"Bearbeiten"} action={handleUpdate}>
                                        <FormInput in={e.name} name={"name"} label={"Webseite"} type={"text"}
                                                   required={true}
                                                   value={(v: string) => {
                                                       setUpdateData({...updateData, update: {...updateData.update, name: v}})
                                                   }}/>
                                        <FormInput in={e?.description} name={"user"} label={"Nutzername"} type={"text"}
                                                   value={(v: string) => {
                                                       setUpdateData({...updateData, update: {...updateData.update, description: v}})
                                                   }}/>
                                    </Form>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Popup trigger={addTrigger} changeTrigger={setAddTrigger}>
                <h2>Hinzufügen</h2>
                <hr/>
                <Form button={"hinzufügen"} action={handleAdd}>
                    <FormInput name={"name"} label={"Titel"} type={"text"} required={true} value={(v: string) => {
                        setAdd({...add, name: v})
                    }}/>
                    <FormInput name={"note"} label={"Notiz"} type={"text"} value={(v: string) => {
                        setAdd({...add, description: v})
                    }}/>
                </Form>
            </Popup>
        </>
    );
}

export default Note;
