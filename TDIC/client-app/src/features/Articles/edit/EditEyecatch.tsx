import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";


export default observer( function EditEyecatch() {

    const {sceneInfoStore} = useStore();


    const handleInputChangeInstruction=() => {
        sceneInfoStore.setScreenShotTrigger();
    }

      
    return (
        <>
            <div>
                <img src={sceneInfoStore.screen_shot} width="100%" />
                <button 
                    type = 'submit'
                    className={"btn btn-outline-primary"}
                    onClick={()=>{handleInputChangeInstruction()}} 
                >
                    {"Capture"}
                </button>
            </div>
        </>


    )
  
})