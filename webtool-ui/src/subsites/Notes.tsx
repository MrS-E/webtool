import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import Popup from "../components/PopUp.tsx";
import Form from "../components/Form.tsx";
import FormInput from "../components/FormInput.tsx";
//@ts-ignore

function Password() : JSX.Element {
    const navigate = useNavigate()
    const [cookies, ] = useCookies(["token"])
    const [node, setNote] = useState<Object[]>([])
    const [addTrigger, setAddTrigger] = useState<boolean>(false)
    const [add, setAdd] = useState({name:"", description:""})
    const [reload, setReload] = useState(0)

    useEffect(() => {
        fetch("http://localhost:3000/notes", {mode: "cors", method: "GET", headers: {"authorization": cookies.token}})
            .then(res =>res.status===401?navigate("/login"):res.json())
            .then(res => setNote(res))
            .catch()
            .finally(()=>setReload(0))

    }, [reload]);

    const handleAdd = () => {
        fetch("http://localhost:3000/notes", {mode: "cors", method: "POST", headers: {"authorization": cookies.token, "Content-Type": "application/json"}, body: JSON.stringify(add)})
            .then(res =>res.status===401?navigate("/login"):res.json())
            .catch()
            .finally(()=>{setReload(reload+1);
                setAddTrigger(false)})
    }

    return (
        <>
            <div>
                <h1>Notes</h1>
                <button onClick={()=>setAddTrigger(true)}>add</button>
                <hr/>
                <div>
                    {node?.map((e:any, index:number) => {
                        return (
                            <div key={"node"+index+"_"+e.id}>
                                <button onClick={()=>{
                                    fetch("http://localhost:3000/notes/"+e.id, {mode: "cors", method: "DELETE", headers: {"authorization": cookies.token}})
                                        .finally(()=>{setReload(reload+1)})
                                }}>Löschen</button>
                                <button>Bearbeiten</button>{/*todo update*/}
                                <div>
                                    <h4>{e.name}</h4>
                                    <p>{e.description}</p>
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
                    <FormInput name={"name"} label={"Webseite"} type={"text"} required={true} value={(v:string)=>{setAdd({...add, name: v})}}/>
                    <FormInput name={"note"} label={"Notiz"} type={"text"} value={(v:string)=>{setAdd({...add, description: v})}}/>
                </Form>
            </Popup>
        </>
    );
}

export default Password;
