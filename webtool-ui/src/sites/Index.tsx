import {useCookies} from "react-cookie";

function Index() {
    const [cookies, ] = useCookies(["token"]);

    console.log("cookies:", cookies.token)

    return (
        <></>
    );
}

export default Index;
