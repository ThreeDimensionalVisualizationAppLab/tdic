import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoogleAd from '../../../app/common/utils/GoogleAd';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ArticleList from './ArticleList';

export default observer(function ArticleDashboard() {      
    
    const {articleStore} = useStore();
    const {loadArticles, articleRegistry} = articleStore;
  
    useEffect(() => {
        if(articleRegistry.size <= 1) loadArticles();
    },[articleRegistry.size, loadArticles])
  
  
    if(articleStore.loading) return <LoadingComponent content='Loading articles...' />



    return(
        <Container>
            <ArticleList />
            {
            <GoogleAd pid={process.env.REACT_APP_GOOGLE_ADSENSE_PUBLISHER_ID!} uid={process.env.REACT_APP_GOOGLE_ADSENSE_UNIT_ID!} />
            }
        </Container>

        
    )
})