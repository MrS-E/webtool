import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";
import fetch from "../classes/fetch.ts";
import {useCookies} from "react-cookie";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";


function Login () :JSX.Element  {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [, setCookie] = useCookies(["token"]);
    const [active, setActive] = useState(true)
    const navigate: NavigateFunction = useNavigate()

    const handleSubmit=async () => {
        setActive(false)
        new fetch("http://localhost:3000/auth", {
            method: fetch.Method.POST,
            headers: ({"Content-Type": "application/json"} as HeadersInit),
            mode: fetch.Mode.CORS,
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
        <Form button={"Anmelden"} action={handleSubmit} active={active}>
            <Input type={"email"} name={"email"} label={"E-Mail"} value={setEmail}/>
            <Input type={"password"} name={"password"} label={"Passwort"} value={setPassword}/>
            <p>Noch kein Konto? <Link to={"/registrieren"}>Jetzt Registrieren</Link></p>
        </Form>
    );
}

export default Login;
