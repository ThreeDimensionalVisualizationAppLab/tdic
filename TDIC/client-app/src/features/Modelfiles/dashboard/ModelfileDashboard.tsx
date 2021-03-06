import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ModelfileList from './ModelfileList';

export default observer(function ModelfileDashboard() {        
    const {modelfileStore} = useStore();
    const {loadModelfiles, ModelfileRegistry} = modelfileStore;
  
    useEffect(() => {
        if(ModelfileRegistry.size <= 1) loadModelfiles();
    },[ModelfileRegistry.size, loadModelfiles])
  
  
    if(modelfileStore.loadingInitial) return <LoadingComponent content='Loading modelfiles...' />



    return(
        <Container>
            <ModelfileList />
        </Container>

    )
})