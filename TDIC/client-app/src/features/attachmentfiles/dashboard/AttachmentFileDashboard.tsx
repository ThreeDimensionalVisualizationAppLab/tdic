import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import AttachmentFileList from './AttachmentFileList';

export default observer(function AttachmentFileDashboard() {        
    const {attachmentfileStore} = useStore();
    const {loadAttachmentfiles, AttachmentfileRegistry} = attachmentfileStore;
  
    useEffect(() => {
        if(AttachmentfileRegistry.size <= 1) loadAttachmentfiles();
    },[AttachmentfileRegistry.size, loadAttachmentfiles])
  
  
    if(attachmentfileStore.loading) return <LoadingComponent content='Loading attachments...' />



    return(
        <Container>
            <Link to={`/attachmentfileupload`}>
                <h3 >Create</h3>
            </Link>
            
            <hr />
            <AttachmentFileList />
        </Container>
    )
})