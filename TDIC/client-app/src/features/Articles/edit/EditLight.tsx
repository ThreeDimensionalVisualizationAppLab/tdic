import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import { Col, Row } from 'react-bootstrap';
import { Light } from '../../../app/models/Light';


export default observer( function EditLight(){
    const history = useHistory();
    
    const {lightStore} = useStore();
    const {selectedLight, createLight, updateLight, deleteLight} = lightStore;


    const [light, setLight] = useState<Light>({
        id_article: 0,
        id_light: 0,
        light_type: '',
        title:  '',
        short_description:  '',
        color: 0,
        intensity: 0,
        px: 0,
        py: 0,
        pz: 0,
        distance: 0,
        decay: 0,
        power: 0,
        shadow: 0,
        tx: 0,
        ty: 0,
        tz: 0,
        skycolor: 0,
        groundcolor: 0,
        is_lensflare: false,
        lfsize: 0,
        file_data: null,
        light_object: null,
    });


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.number().required(),
        id_light: Yup.number().required(),
    });
/*
    useEffect(()=>{
        loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        });
    }, []);*/

    useEffect(()=>{
        //if(id) loadTask(Number(id)).then(task => setTask(task!))
        selectedLight && setLight(selectedLight);
    }, [selectedLight]);

    
    function handleFormSubmit(light:Light) {
        if(light.id_light ==0 ){
            let newLight = {
                ...light
            };
            console.log(newLight);
            createLight(newLight);
//            createTask(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            //console.log(light);
            updateLight(light);
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
        }
    }

    
    function handleFormSubmitDelete(light:Light) {
        console.log("called del");
        if(light){
            deleteLight(light);
        } else {
        }
    }

    


    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={light} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={2}><TextInputGeneral label='Light ID' name='id_light' placeholder='Light ID' /></Col>
                            <Col xs={4}><TextInputGeneral label='Light Type' name='light_type' placeholder='Light Type' /></Col>
                            <Col xs={6}><TextInputGeneral label='Light Title' name='title' placeholder='Light Title' /></Col>
                        </Row>

                        <Row>
                            <Col ><TextAreaGeneral label='Description' placeholder='Description' name='short_description' rows={1}   /></Col>
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
                        
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                        <Link to={`/article/${light.id_article}`}>Cancel</Link>
                    </Form>
                )}

            </Formik>


            

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={light} 
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