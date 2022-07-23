
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import { Col, Row } from 'react-bootstrap';
import { Annotation } from '../../../app/models/Annotation';
import { Vector3 } from 'three';


export default observer( function EditAnnotation(){
    const history = useHistory();
    
    const {articleStore} = useStore();
    const {annotationStore} = useStore();
    const {selectedAnnotation, editAnnotationInternal, updateAnnotation, createAnnotation, deleteAnnotation} = annotationStore;


    const [annotation, setAnnotation] = useState<Annotation>({
        id_article: articleStore?.selectedArticle?.id_article!,
        id_annotation: 0,

        title: '',
        description1: '',
        description2: '',
        
        status: 0,

        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
    });


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.number().required(),
        id_annotation: Yup.number().required(),
    });
    
/*
    useEffect(()=>{
        loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        });
    }, []);*/

    useEffect(()=>{
        //if(id) loadTask(Number(id)).then(task => setTask(task!))
        selectedAnnotation && setAnnotation(selectedAnnotation);
    }, [selectedAnnotation]);

    
    function handleFormSubmit(annotation:Annotation) {
        if(annotation.id_annotation ==0 ){
            let newAnnotation = {
                ...annotation
            };
            console.log(newAnnotation);
            createAnnotation(newAnnotation);
//            createTask(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            //console.log(annotation);
            updateAnnotation(annotation);
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
        }
    }

    

    
    function handleFormSubmitDelete(object:Annotation) {
        //console.log("called del");
        if(object){
            deleteAnnotation(object);
        } else {
        }
    }

    
    const handleInputChangeAnnotationPosition=(diff_pos: Vector3) => {
        editAnnotationInternal({
            id_article: annotation.id_article,
            id_annotation: annotation.id_annotation,
    
            title: annotation.title,
            description1: annotation.description1,
            description2: annotation.description2,
            
            status: annotation.status,
    
            pos_x: annotation.pos_x + diff_pos.x,
            pos_y: annotation.pos_y + diff_pos.y,
            pos_z: annotation.pos_z + diff_pos.z,
        });
    }

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={annotation} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={3}><TextInputGeneral label='Annotation ID' name='id_annotation' placeholder='Annotation ID' /></Col>
                            <Col xs={6}><TextInputGeneral label='Annotation Title' name='title' placeholder='Annotation Title' /></Col>
                            <Col xs={3}><TextInputGeneral label='Status' name='status' placeholder='Status' /></Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col ><TextAreaGeneral label='Description1' placeholder='Description1' name='description1' rows={2}   /></Col>
                            <Col ><TextAreaGeneral label='Description2' placeholder='Description2' name='description2' rows={2}   /></Col>
                        </Row>

                        <hr />
                        
                        <Row>
                            <Col xs={4}><TextInputGeneral label='POS X' name='pos_x' placeholder='POS X' /></Col>
                            <Col>
                                <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-1,0,0))}} >-1 </button>
                                <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(1,0,0))}} >+1 </button>
                                <br />
                                <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-0.1,0,0))}} >-0.1</button>
                                <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0.1,0,0))}} >+0.1</button>
                                <br />
                                <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-0.01,0,0))}} >-0.01</button>
                                <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0.01,0,0))}} >+0.01</button>
                            </Col>
                        <Row>
                        <br />
                        </Row>
                            <Col xs={4}><TextInputGeneral label='POS Y' name='pos_y' placeholder='POS Y' /></Col>
                            <Col>
                                <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-1,0))}} >-1 </button>
                                <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,1,0))}} >+1 </button>
                                <br />
                                <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-0.1,0))}} >-0.1</button>
                                <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0.1,0))}} >+0.1</button>
                                <br />
                                <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-0.01,0))}} >-0.01</button>
                                <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0.01,0))}} >+0.01</button>
                            </Col>
                        <Row>
                        <br />
                        </Row>
                            <Col xs={4}><TextInputGeneral label='POS Z' name='pos_z' placeholder='POS Z' /></Col>
                            <Col>
                                <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-1))}} >-1 </button>
                                <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,1))}} >+1 </button>
                                <br />
                                <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-0.1))}} >-0.1</button>
                                <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,0.1))}} >+0.1</button>
                                <br />
                                <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-0.01))}} >-0.01</button>
                                <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,0.01))}} >+0.01</button>
                            </Col>
                        </Row>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                    </Form>
                )}

            </Formik>
            

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={annotation} 
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