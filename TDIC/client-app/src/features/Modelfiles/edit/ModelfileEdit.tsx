import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { Formik , Form } from "formik";
import * as Yup from 'yup';
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import { Modelfile } from "../../../app/models/ModelFile";
import { Col, Row } from "react-bootstrap";
import ModelfileViewer from "../common/ModelfileViewer";

export default observer( function ModelfileEdit(){
    const history = useHistory();
    const { modelfileStore} = useStore();
    const { loadModelfile, updateModelfile, loading } = modelfileStore;

    const {id} = useParams<{id: string}>();

    const [modelfile, setModelfile] = useState<Modelfile>({
        id_part: 0,
        part_number: '',
        version: 0,
        type_data: '',
        format_data: '',
        file_name: '',
        file_length: 0,
        itemlink: '',
        license: '',
        author: '',
        memo: '',
        create_datetime: null,
        latest_update_datetime: null,
    });


    const validationSchema = Yup.object({
        part_number: Yup.string().required('The part_number is required'),
        /*
        shortDescription: Yup.string().nullable(),
        startDatetimeScheduled: Yup.date().nullable(),
        startDatetimeActual: Yup.date().nullable(),
        endDatetimeScheduled: Yup.date().nullable(),
        endDatetimeActual: Yup.date().nullable(),
        status: Yup.number().required(),*/
    });
    

    const validationSchemaDel = Yup.object({
        id: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });

    useEffect(()=>{
        //loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        //});
    }, []);

    useEffect(()=>{
        if(id) loadModelfile(Number(id)).then(modelfile => setModelfile(modelfile!))
    }, [id, loadModelfile]);

    
    function handleFormSubmit(modelfile:Modelfile) {
        if(modelfile.id_part ===0 ){
            let newModelfile = {
                ...modelfile
            };
            //console.log(newTask);
//            createTask(newTask);
//            createTask(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            updateModelfile(modelfile);
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
        }
    }

    
    function handleFormSubmitDelete(modelfile:Modelfile) {
        //console.log("called");
        if(modelfile.id_part ===0 ){
        } else {
            //deleteTask(task.id);
        }
    }

    if(loading) return <LoadingComponent content="Loading task..." />

    return(
        <div>         
            <h3>Model Edit</h3> 


            
            <div className="row" id="model_screen" style={{ width: 640, height : 360 }}>
                {
                    <ModelfileViewer id_part={Number(id)}/>
                }
            </div>




            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={modelfile} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        
                        <Row>
                            <Col xs={4}><label>Type Data</label><input className="form-control" value={modelfile.type_data} disabled /></Col>
                            <Col xs={4}><label>File Name</label><input className="form-control" value={modelfile.file_name} disabled /></Col>
                            <Col xs={4}><label>File Length</label><input className="form-control" value={modelfile.file_length} disabled /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><TextInputGeneral label='Part Number' name='part_number' placeholder='part_number' /></Col>
                            <Col xs={2}><TextInputGeneral label='Version' name='version' placeholder='version' /></Col>
                            <Col xs={2}><TextInputGeneral label='Format Fata' name='format_data' placeholder='format_data' /></Col>
                        </Row>

                        <Row>
                            <Col xs={10}><TextInputGeneral label='Itemlink' name='itemlink' placeholder='itemlink' /></Col>
                            <Col xs={4}><TextInputGeneral label='License' name='license' placeholder='license' /></Col>
                            <Col xs={4}><TextInputGeneral label='Author' name='author' placeholder='author' /></Col>
                        </Row>
                        
                        <Row>
                            <Col xs={6}><TextInputGeneral label='Memo' name='memo' placeholder='memo' /></Col>
                        </Row>
                        
                        
                        
                        
                        
                                                
                        <button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</button>
                    </Form>
                )}

            </Formik>

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={modelfile} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} 
                            type = 'submit' >Delete</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})