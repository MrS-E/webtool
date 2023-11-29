import {useEffect, useState} from "react";

function FormInput(props:any ) :JSX.Element {
    const [value, setValue] = useState<string>("")

    useEffect(()=>{ props.value(value)}, [value])

    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input value={value} onChange={e=>setValue(e.target.value)} type={props.type} name={props.name} id={props.name} required={props.required?props.required:false}/>
        </>
    );
}

export default FormInput;
