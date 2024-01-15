import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";
import {useCookies} from "react-cookie";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {server} from "../variables.ts";
import './Login.css'

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
            .then(res => res.status === 401 ? "" : res.text())
            .then(res => {
                if(res.length>0) {
                    setCookie("token", res, {path: "/"})
                    console.log(res)
                    navigate("/")
                }else{
                    setLoginError("E-Mail oder Passwort ist inkorrekt.")
                }
            })
            .catch(e => {console.error(e);
                setLoginError("Etwas ist katastrophal schief gelaufen. Bitte versuchen Sie es etwas später wieder.")})
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
                <p>Noch kein Konto? <Link to={"/registrieren"}><span>Jetzt Registrieren</span></Link></p>
            </Form>
        </div>
    );
}

export default Login;
