import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Dashboard from "../subsites/Dashboard.tsx";

function Main(): JSX.Element {
    const [searchParams, ] = useSearchParams();
    const [render, setRender] = useState<JSX.Element>()
    const tool = searchParams.get("tool")

    useEffect(() => {
        switch (tool) {
            default:
                setRender(<Dashboard/>)
                break
        }
    }, [tool])

    return (
        <>
            <section>
                <div>

                </div>
                <button>Add Tool</button>
            </section>
            <section>
                {render}
            </section>
        </>
    );
}

export default Main;