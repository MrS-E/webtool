import {useCookies} from "react-cookie";
import Main from "./Main.tsx";
import Home from "./Home.tsx";

function Index() : JSX.Element {
    const [cookies, ] = useCookies(["token"]);

    console.log("cookies:", cookies.token)

    if(cookies.token) {
        return <Main/>;
    } else {
        return <Home/>;
    }
}

export default Index;
