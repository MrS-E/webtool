import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";
//import fetch from "../classes/fetch.ts";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


function Login () :JSX.Element  {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [, setCookie] = useCookies(["token"]);
    const [active, setActive] = useState(true)

    const handleSubmit=()=> {
        fetch("http://localhost:3000/auth", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            mode:"no-cors",
            body: JSON.stringify({emial:email, password:password})
        }).then(res=>res.text())
            .then(res=>console.log(res))
            .catch(e=>console.error(e))

       /* const builder = new fetch.Builder("localhost:3000/auth")
        builder.setBody({email:email, password:password})
        builder.setMethode("POST")
        builder.setHeaders({
            "Content-Type":"application/json"
        })

        setActive(false)

        builder.build().json()
            .then(res=> {
                setCookie("token", res, {path: "/"})
                useNavigate()("/")
                console.log(res)
            })
            .catch(e=>console.error(e))
            .finally(()=>{
                setActive(true)
            })*/
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
