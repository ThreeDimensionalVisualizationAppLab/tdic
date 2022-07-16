import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../../app/stores/store";

export default observer( function AttachmentFileList() {
    const {attachmentfileStore } = useStore();
     const {AttachmentfileRegistry} = attachmentfileStore;
     //console.log(AttachmentfileArray);
     //console.log(AttachmentfilesArray[0].id_file);

    return (
        <>
            { 
                Array.from(AttachmentfileRegistry.values()).map(x=>(<p key = {x.id_file}>{x.name}</p>))
            //AttachmentfilesArray.forEach(x=> <p>{x.id_file}</p>)
            
            /*
            .map(([group, attachmentfiles]) => (
                <Fragment key = {group}>
                    <Header sub color = 'teal'>
                        {group}
                    </Header>  
                    <p>xxxxxxx</p>                 

                </Fragment>

            )) */}
        </>


    )
})