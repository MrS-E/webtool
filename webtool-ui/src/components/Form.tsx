import "./Form.css"

function Form(props:any):JSX.Element {

    async function mySubmitFunction(e: { preventDefault: () => void; }) {
        e.preventDefault();
        await props.action()
        return false;
    }

    return (
        <form onSubmit={mySubmitFunction} style={{
            display: "grid",
            rowGap: "5px",
            maxWidth: "100%",
        }}>
            {props.children}
            <button type={"submit"} disabled={props.active?!props.active:false}>{props.button}</button>
        </form>
    );
}

export default Form;
