
function Form(props:any):JSX.Element {

    function mySubmitFunction(e: { preventDefault: () => void; }) {
        e.preventDefault();
        props.action()
        return false;
    }

    return (
        <form onSubmit={mySubmitFunction}>
            {props.children}
            <button type={"submit"} disabled={props.active?!props.active:false}>{props.button}</button>
        </form>
    );
}

export default Form;
