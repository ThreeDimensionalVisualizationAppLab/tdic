import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer( function ModelfileList() {
    const { modelfileStore } = useStore();
     const {ModelfileRegistry} = modelfileStore;

    return (
        <>
            { 
                Array.from(ModelfileRegistry.values()).map(x=>(
                    <Link key = {x.id_part} to={`/modelfile/${x.id_part}`}>
                        <h3 >{x.file_name}</h3>
                    </Link>
                ))
            }
                            
        </>


    )
})