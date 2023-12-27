import Form from "../components/Form.tsx";
import FormInput from "../components/FormInput.tsx";
import {useState} from "react";
import {useNavigate, Link, NavigateFunction} from "react-router-dom";
import {server} from "../variables.ts";

function Register(): JSX.Element {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [auth, setAuth] = useState()
    const [active, setActive] = useState(true)
    const navigate: NavigateFunction = useNavigate()

    const handleSubmit = async () => {
        setActive(false)
        fetch(server+"/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify({firstname:firstname, lastname:lastname, email:email, auth:auth})
        })
        .then(() => {
            navigate("/login")
        })
        .catch(e => console.error(e))
        .finally(() => setActive(true))

    }

    return (
        <div>
            <h1>Registrierung</h1>
            <Form button={"Registrieren"} active={active} action={handleSubmit}>
                <FormInput type={"text"} name={"fname"} value={setFirstname} label={"Vorname"}/>
                <FormInput type={"text"} name={"lname"} value={setLastname} label={"Nachname"}/>
                <FormInput type={"email"} name={"email"} value={setEmail} label={"E-Mail"}/>
                <FormInput type={"password"} name={"password"} value={setAuth} label={"Passwort"}/>
                <p>Haben Sie schon einen Account: <Link to={"/login"}>Melden Sie sich an!</Link></p>
            </Form>
        </div>
    );
}

export default Register;