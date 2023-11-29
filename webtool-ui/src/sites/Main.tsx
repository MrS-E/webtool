import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import Dashboard from "../subsites/Dashboard.tsx";
import Password from "../subsites/Password.tsx";

function Main(): JSX.Element {
    const [searchParams, ] = useSearchParams();
    const [render, setRender] = useState<JSX.Element>()
    const tool = searchParams.get("tool")

    useEffect(() => {
        switch (tool) {
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
                    <Link to={"/?tool=password"}>Passwort-Manager</Link>
                </div>
            </section>
            <section>
                {render}
            </section>
        </>
    );
}

export default Main;