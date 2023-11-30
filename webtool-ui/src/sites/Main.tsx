import {useEffect, useState} from "react";
import Dashboard from "../subsites/Dashboard.tsx";
import Password from "../subsites/Password.tsx";
import Notes from "../subsites/Notes.tsx";

function Main(): JSX.Element {
    const [render, setRender] = useState<JSX.Element>()
    const [tool, setTool] = useState<string>("")

    useEffect(() => {
        switch (tool) {
            case "notes":
                setRender(<Notes/>)
                break
            case "password":
                setRender(<Password/>)
                break
            default:
                setRender(<Dashboard/>)
                break
        }
    }, [tool])

    return (
        <>
            <section>
                <div>
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
