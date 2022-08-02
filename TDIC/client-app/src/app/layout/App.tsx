import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import AttachmentFileDashboard from '../../features/attachmentfiles/dashboard/AttachmentFileDashboard';
import ArticleDashboard from '../../features/Articles/dashboard/ArticleDashboard';
import ArticleDetails from '../../features/Articles/details/ArticleDetails';
import ModelfileDashboard from '../../features/Modelfiles/dashboard/ModelfileDashboard';
import ModelfileDetails from '../../features/Modelfiles/details/ModelfileDetails';
import RegisterForm from '../../features/users/RegisterForm';
import ArticleEdit from '../../features/Articles/edit/ArticleEdit';
import ModelfileUpload from '../../features/Modelfiles/upload/ModelfileUpload';
import Privacy from '../../features/Privacy/Privacy';
import { initializeGA, useTracking } from '../common/utils/GoogleAnalyticsUtil';
import { GoogleAdHead } from '../common/utils/GoogleAdHead';
import AttachmentFileDetails from '../../features/attachmentfiles/details/AttachmentFileDetails';
import ModelfileCreate from '../../features/Modelfiles/create/ModelfileCreate';
import ModelfileEdit from '../../features/Modelfiles/edit/ModelfileEdit';
import AttachmentfileUpload from '../../features/attachmentfiles/upload/AttachmentfileUpload';

function App() {
  
  useEffect(() => {
    // loading GoogleAnalytics gtag.js
    initializeGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID!);
    GoogleAdHead(process.env.REACT_APP_GOOGLE_ADSENSE_PUBLISHER_ID!)
  }, []);

  
  // GoogleAnalytics Tracking
  useTracking(process.env.REACT_APP_GOOGLE_ANALYTICS_ID!);



  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=> commonStore.setAppLoaded());

    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app ...' />

  return (
    <>
      <ToastContainer position ='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route
        //path={'/(.+)'}        
        render={() => (
          <>          
            <NavBar />
            <div className="container-fluid">
              <Switch>
                <Route exact path = '/' component={ArticleDashboard} />       
                <Route path = '/articles' component={ArticleDashboard} />
                <Route path = '/article/:id' component={ArticleDetails} />
                <Route path = '/articleedit/:id' component={ArticleEdit} />
                {
         //       <Route key = {location.key} path = {['/createStatus', '/editstatus/:id']} component={ArticleEdit} />
        }
                <Route key = {location.key} path = {['/createarticle', '/articleedit/:id']} component={ArticleEdit} />

                <Route path = '/attachmentfiles' component={AttachmentFileDashboard} />
                <Route path = '/attachmentfile/:id' component={AttachmentFileDetails} />
                <Route path = '/attachmentfileupload' component={AttachmentfileUpload} />
                <Route path = '/modelfiles' component={ModelfileDashboard} />
                <Route path = '/modelfile/:id' component={ModelfileDetails} />
                <Route path = '/modelfilecreate' component={ModelfileCreate} />
                <Route path = '/modelfileedit/:id' component={ModelfileEdit} />
                <Route path = '/modelfileupload/:id' component={ModelfileUpload} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route path='/register' component={RegisterForm} />
                <Route path='/privacy' component={Privacy} />
                <Route component={NotFound} />

                
              </Switch>
            </div>    
          </>
        )}
      />
    </>
  );
}

export default observer(App);
