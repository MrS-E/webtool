import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";
import fetch from "../classes/fetch.ts";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


function Login () :JSX.Element  {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [, setCookie] = useCookies(["token"]);
    const [active, setActive] = useState(true)

    const handleSubmit=()=> {
        const builder = new fetch.Builder("/auth")
        builder.setBody({email:email, password:password})
        builder.setMethode("POST")

        setActive(false)

        builder.build().json()
            .then(res=> {
                setCookie("token", res, {path: "/"})
                useNavigate()("/")
            })
            .catch(e=>console.error(e))
            .finally(()=>{
                setActive(true)
            })
    }

    return (
        <>
            <Form button={"Anmelden"} action={handleSubmit} active={active}>
                <Input type={"text"} name={"email"} label={"E-Mail"} value={setEmail}/>
                <Input type={"password"} name={"password"} label={"Passwort"} value={setPassword}/>
            </Form>
        </>
    );
}

export default Login;
