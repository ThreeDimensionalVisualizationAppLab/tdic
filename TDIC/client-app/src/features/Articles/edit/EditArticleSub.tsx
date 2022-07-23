
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import { Col, Row } from 'react-bootstrap';
import { Article } from '../../../app/models/article';
import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';
import SelectInputGeneral from '../../../app/common/form/SelectInputGeneral';
import LoadingComponent from '../../../app/layout/LoadingComponents';


export default observer( function EditArticleSub(){
    const history = useHistory();
    
    const [isDataLoadingFinished, setIsDataLoadingFinished]= useState<boolean>(false);
    
    const {articleStore} = useStore();
    const {selectedArticle, updateArticle, createArticle, deleteArticle} = articleStore;

    
    const {mArticleStatusStore} = useStore();
    const {loadStatuses, loadingInitial : loadingInitialstatus, getOptionArray} = mArticleStatusStore;

    const [article, setArticle] = useState<Article>({
            
        id_article: 0,
        id_assy: 0,

        title: '',
        short_description: '',
        long_description: '',
        meta_description: '',
        meta_category: '',

        status: 1,

        directional_light_color: 0,
        directional_light_intensity: 0,
        directional_light_px: 0,
        directional_light_py: 0,
        directional_light_pz: 0,

        ambient_light_color: 0,
        ambient_light_intensity: 0,

        gammaOutput: false,

        id_attachment_for_eye_catch: 0,

        bg_c: 0,
        bg_h: 0,
        bg_s: 0,
        bg_l: 0,
        isStarrySky: false,
    });


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.number().required(),
    });
    
/*
    const validationSchemaDel = Yup.object({
        id: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });*/

    useEffect(()=>{
        loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        });
    }, []);

    useEffect(()=>{
        //if(id) loadTask(Number(id)).then(task => setTask(task!))
        selectedArticle && setArticle(selectedArticle);
        loadStatuses();
    }, [selectedArticle]);


    useEffect(() => { 
        setIsDataLoadingFinished(!loadingInitialstatus);        
    },[loadingInitialstatus])
    

    function handleFormSubmit(object:Article) {
        if(object.id_article ==0 ){
            let newObject = {
                ...object
            };
            //console.log(newTask);
            createArticle(newObject);
            //createArticle(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            //console.log(object);
            updateArticle(object);
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
        }
    }

    
    function handleFormSubmitDelete(object:Article) {
        //console.log("called del");
        if(object){
            deleteArticle(object);
        } else {
        }
    }


    if(!isDataLoadingFinished) return (<><LoadingComponent /></>);

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={2}><TextInputGeneral label='Assy ID' name='id_assy' placeholder='Assy ID' /></Col>
                            <Col xs={3}><SelectInputGeneral label='Status' placeholder='status' name='status' options={getOptionArray()} /></Col>
                            <Col xs={7}><TextInputGeneral label='Article Title' name='title' placeholder='Article Title' /></Col>
                        </Row>

                        <Row>
                            <Col ><TextAreaGeneral label='Short Description' placeholder='Description' name='short_description' rows={3}   /></Col>
                        </Row>
                        
                        <Row>
                            <Col ><TextAreaGeneral label='Long Description' placeholder='Description' name='long_description' rows={3}   /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><TextInputGeneral label='Color' name='color' placeholder='Color' /></Col>
                            <Col xs={4}><TextInputGeneral label='Intensity' name='intensity' placeholder='Intensity' /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><TextInputGeneral label='POS X' name='px' placeholder='POS X' /></Col>
                            <Col xs={4}><TextInputGeneral label='POS Y' name='py' placeholder='POS Y' /></Col>
                            <Col xs={4}><TextInputGeneral label='POS Z' name='pz' placeholder='POS Z' /></Col>
                        </Row>

                        <hr />

                        
                        <Row>
                            <Col xs={4}><TextInputGeneral label='Distance' name='distance' placeholder='Distance' /></Col>
                            <Col xs={4}><TextInputGeneral label='Decay' name='decay' placeholder='Decay' /></Col>
                        </Row>
                        
                        <Row>
                            <Col xs={4}><CheckBoxGeneral label='gammaOutput' name='gammaOutput'  /></Col>
                        </Row>
                        
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                    </Form>
                )}

            </Formik>




            

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>Delete</button>
                    </Form>
                )}
            </Formik>










        </div>
    )
})