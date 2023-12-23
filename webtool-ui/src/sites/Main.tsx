import {useEffect, useState} from "react";
import Dashboard from "../subsites/Dashboard.tsx";
import Password from "../subsites/Password.tsx";
import Notes from "../subsites/Notes.tsx";

function Main(): JSX.Element {
    const [render, setRender] = useState<JSX.Element>()
    const [tool, setTool] = useState<string>("")
    const [hiddeBack, setHiddeBack] = useState<boolean>(true)

    useEffect(() => {
        switch (tool) {
            case "notes":
                setHiddeBack(false)
                setRender(<Notes/>)
                break
            case "password":
                setHiddeBack(false)
                setRender(<Password/>)
                break
            default:
                setHiddeBack(true)
                setRender(<Dashboard/>)
                break
        }
    }, [tool])

    return (
        <>
            <section>
                <div>
                    <button style={!hiddeBack?{}:{display: "none"}} onClick={()=>setTool("dashboard")}>Back</button>
                    <button onClick={()=>setTool("password")}>Passwort-Manager</button>
                    <button onClick={()=>setTool("notes")}>Notes</button>
                </div>
            </section>
            <section>
                {render}
            </section>
        </>
    );
}

export default Main;
