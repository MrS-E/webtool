import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {server} from "../variables.ts";
import "./Dashboard.css"

function Dashboard(): JSX.Element {
    const [elm, setElm] = useState<{note: Object[], password: Object[]}>()
    const [dash, setDash] = useState<{note: Object[], password: Object[]}>/*<{name:string, show:boolean}[]>*/()
    const navigate = useNavigate()
    const [cookies, ] = useCookies(["token"])

    useEffect(() => {
        fetch(server+"/dashboard", {mode: 'cors', headers: {"authorization": cookies.token}, method: 'GET'})
            .then(res =>res.status===401?navigate("/login"):res.json())
            .then(res => setDash(res))
    }, []);

    useEffect(() => {
        /*if(dash) { //for original use indented
            const elements: JSX.Element[] = []
            for (let i of dash) {
                switch (i.name) {
                    case "password":
                        elements.push()
                        break
                    case "note":
                        elements.push()
                        break
                    default:
                        break
                }
            }
            setElm(elements)
        }*/
        setElm(dash)

    }, [dash]);

    return (
        <div className={"container"}>
            <h1>Dashboard</h1>
            <div>
                <h3> Newest Notes</h3>
                <div className={"container-dash"}>
                    {elm?.note?.map((e:any, i: number) : JSX.Element => (
                        <div className={"notes"} key={i+"dash_note"}>
                            <p>
                                <strong>{e?.name}</strong><br/>
                                {e?.description}
                            </p>
                        </div>
                    ))}
                    {elm?.note.length===0?<p>Keine Notizen</p>:<></>}
                </div>
            </div>
            <div>
                <h3> Newest Passwords</h3>
                <div className={"container-dash"}>
                    {elm?.password?.map((e:any, i: number) : JSX.Element => (
                        <div className={"password"} key={i+"dash_passwd"}>
                            <p>
                                <strong>{e?.name}</strong><br/>
                                {e?.email?<>{e.email}<br/></>:""}
                                {e?.username?<>{e.username}<br/></>:""}
                                {e?.description?<>{e.description}<br/></>:""}
                            </p>
                        </div>
                    ))}
                    {elm?.password.length===0?<p>Keine Passwörter</p>:<></>}
                    </div>
            </div>

        </div>
    );
}

export default Dashboard;