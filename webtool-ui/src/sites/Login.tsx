import Form from '../components/Form.tsx'
import Input from "../components/FormInput.tsx";
import {useState} from "react";


function Login () :JSX.Element  {
    const [email, setEmail] = useState<string>("")

    const handleSubmit=()=>{

    }

    return (
        <>
            <Form button={"Anmelden"} action={handleSubmit}>
                <Input type={"text"} name={"email"} label={"E-Mail"} value={setEmail}/>
            </Form>
        </>
    );
};

export default Login;
