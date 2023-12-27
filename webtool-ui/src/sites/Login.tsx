import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";
import {useCookies} from "react-cookie";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {server} from "../variables.ts";


function Login () :JSX.Element  {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [, setCookie] = useCookies(["token"]);
    const [active, setActive] = useState(true)
    const navigate: NavigateFunction = useNavigate()
    const [loginError, setLoginError] = useState("")

    const handleSubmit=async () => {
        setActive(false)
        fetch(server+"/auth", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify({email:email, password:password})
        })
            .text()
            .then(res => {
                setCookie("token", res, {path: "/"})
                navigate("/")
                console.log(res)
            })
            .catch(e => console.error(e))
            .finally(() => {
                setActive(true)
            })
    }

    return (
        <div>
            <h1>Anmeldung</h1>
            <Form button={"Anmelden"} action={handleSubmit} active={active}>
                <Input type={"email"} name={"email"} label={"E-Mail"} value={setEmail}/>
                <Input type={"password"} name={"password"} label={"Passwort"} value={setPassword}/>
                <p>{loginError}</p>
                <p>Noch kein Konto? <Link to={"/registrieren"}>Jetzt Registrieren</Link></p>
            </Form>
        </div>
    );
}

export default Login;
