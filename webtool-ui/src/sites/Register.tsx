import Form from "../components/Form.tsx";
import FormInput from "../components/FormInput.tsx";
import {useState} from "react";
import fetch from "../classes/fetch.ts";
import {useNavigate, Link} from "react-router-dom";

function Register(): JSX.Element {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [auth, setAuth] = useState()
    const [active, setActive] = useState(true)

    const handleSubmit = async () => {
        setActive(false)
        new fetch("http://localhost:3000/user", {
            method: fetch.Method.POST,
            headers: ({"Content-Type": "application/json"} as HeadersInit),
            mode: fetch.Mode.CORS,
            body: JSON.stringify({firstname:firstname, lastname:lastname, email:email, auth:auth})
        })
        .exec()
        .then(() => {
            useNavigate()("/login")
        })
        .finally(() => setActive(true))
        .catch(e => console.error(e))
    }

    return (
        <Form button={"Registrieren"} active={active} action={handleSubmit}>
            <FormInput type={"text"} name={"fname"} value={setFirstname} label={"Vorname"}/>
            <FormInput type={"text"} name={"lname"} value={setLastname} label={"Nachname"}/>
            <FormInput type={"email"} name={"email"} value={setEmail} label={"E-Mail"}/>
            <FormInput type={"password"} name={"password"} value={setAuth} label={"Passwort"}/>
            <p>Haben Sie schon einen Account: <Link to={"/login"}>Melden Sie sich an!</Link></p>
        </Form>
    );
}

export default Register;