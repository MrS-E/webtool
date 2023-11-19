import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";
import fetch from "../classes/fetch.ts";
import {useCookies} from "react-cookie";


function Login () :JSX.Element  {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [, setCookie] = useCookies(["token"]);

    const handleSubmit=()=> {
        const builder = new fetch.Builder("/auth")
        builder.setBody({email:email, password:password})
        builder.setMethode("POST")

        builder.build().json()
            .then(res=> setCookie("token", res, {path: "/"}))
            .catch(e=>console.error(e))

    }

    return (
        <>
            <Form button={"Anmelden"} action={handleSubmit}>
                <Input type={"text"} name={"email"} label={"E-Mail"} value={setEmail}/>
                <Input type={"password"} name={"password"} label={"Passwort"} value={setPassword}/>
            </Form>
        </>
    );
}

export default Login;
