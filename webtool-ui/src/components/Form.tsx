
function Form(props:any):JSX.Element {
    return (
        <form onSubmit={props.action}>
            {props.children}
            <button type={"submit"}>{props.button}</button>
        </form>
    );
}

export default Form;
