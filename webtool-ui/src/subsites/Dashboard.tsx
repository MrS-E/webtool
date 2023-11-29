import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function Dashboard(): JSX.Element {
    const [elm, setElm] = useState<JSX.Element[]>()
    const [dash, setDash] = useState<{name:string, show:boolean}[]>()
    const navigate = useNavigate()
    const [cookies, ] = useCookies(["token"])

    useEffect(() => { //todo replace with useFetch
        fetch("http://localhost:3000/dashboard", {mode: 'cors', headers: {"authorization": cookies.token}, method: 'GET'})
            .then(res =>res.status===401?navigate("/login"):res.json())
            .then(res => setDash(res))
    }, []);

    useEffect(() => {
        if(dash) {
            const elements: JSX.Element[] = []
            for (let i: { name: string, show: boolean } of dash) {
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
        }
    }, [dash]);

    return (
        <div>
            <h1>Dashboard</h1>
            {elm?.map((e:JSX.Element) => e)}
        </div>
    );
}

export default Dashboard;