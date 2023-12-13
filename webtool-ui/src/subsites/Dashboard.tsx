import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import './Dashboard.scss';

function Dashboard(): JSX.Element {
    const [elm, setElm] = useState<{note: Object[], password: Object[]}>()
    const [dash, setDash] = useState<{note: Object[], password: Object[]}>/*<{name:string, show:boolean}[]>*/()
    const navigate = useNavigate()
    const [cookies, ] = useCookies(["token"])

    useEffect(() => {
        fetch("http://localhost:3000/dashboard", {mode: 'cors', headers: {"authorization": cookies.token}, method: 'GET'})
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
        <div>
            <h1>Dashboard</h1>
            <div>
                <h3> Newest Notes</h3>
                {elm?.note?.map((e:any, i: number) : JSX.Element => (
                    <div key={i+"dash_note"}>
                        <p><strong>{e?.name}</strong></p>
                        <p>
                            {e?.description}
                        </p>
                    </div>
                ))}
                {elm?.note.length===0?<p>Keine Notizen</p>:<></>}
            </div>
            <div>
                <h3> Newest Passwords</h3>
                {elm?.password?.map((e:any, i: number) : JSX.Element => (
                    <div key={i+"dash_passwd"}>
                        <p><strong>{e?.name}</strong></p>
                        <p>
                            {e?.email}<br/>
                            {e?.username}<br/>
                            {e?.description}
                        </p>
                    </div>
                ))}
                {elm?.password.length===0?<p>Keine Passwörter</p>:<></>}
            </div>

        </div>
    );
}

export default Dashboard;