function Popup(props:any) : JSX.Element{ //simple popup
    if(props.trigger){ //only shows popup if trigger is true
        return(
            <div style={popup}>
                <div style={popupInner}>
                    <div>
                        <button style={closeBtn} onClick={() => {props.changeTrigger(false)}}>close</button> {/*to close popup*/}
                    </div>
                    <div className="container">
                        {props.children}
                    </div>
                </div>
            </div>
        );
    }else{
        return <></>;
    }
}


const popup:any = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}
const popupInner:any = {
    position: "relative",
    padding: "3vmin",
    width: "100%",
    maxWidth: "75vw",
    backgroundColor: "white",
    overflow: "scroll"
}
const closeBtn:any ={
    position: "absolute",
    top: "16px",
    right: "16px"
}
export default Popup;