import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";
import useFetch from "../hooks/useFetch.ts";


function Login () :JSX.Element  {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [exec, setExec] = useState<boolean>(false)
    const post = useFetch(
        "http://localhost:3000/auth",
        "POST",
        null,
        {email:email, password:password},
        exec
    )

    const handleSubmit=()=>{
        setExec(true)
    }

    return (
        <>
            <Form button={"Anmelden"} action={handleSubmit}>
                <Input type={"text"} name={"email"} label={"E-Mail"} value={setEmail}/>
                <Input type={"password"} name={"password"} label={"Passwort"} value={setPassword}/>
            </Form>
        </>
    );
};

export default Login;
