import {useEffect, useState} from "react";
import "./FormInput.css";

function FormInput(props:any ) :JSX.Element {
    const [value, setValue] = useState<string>(props.in?props.in:"")

    useEffect(()=>{ props.value(value)}, [value])

    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input value={value} onChange={e=>setValue(e.target.value)} type={props.type} name={props.name} id={props.name} required={props.required?props.required:false}/>
        </>
    );
}


export default FormInput;
