import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { UploadFileDto } from "../../../app/models/UploadFileDto";
import FileInputGeneral from "../../../app/common/form/FileInputGeneral";



export default observer( function ModelfileUpload() {

    const {id} = useParams<{id:string}>();

    const {modelfileStore} = useStore();
    const {selectedModelfile, setSelectedModelfile, loading, setLoaing} = modelfileStore;
    const [update,setUpdata]=useState<boolean>(false)

    
    const [fileparam, setFileparam] = useState<UploadFileDto>({
        id_part: 0,
        file_data: null,
        title: "test",
    });


    //setSelectedModelfile(Number(id));

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });

    useEffect(()=> {

        if(id) {
            setSelectedModelfile(Number(id));
            setLoaing(false);
            setUpdata(update?false:true)
        }

    }, [id])

    


    if(!selectedModelfile) return (<><LoadingComponent /></>);

    function handleFormSubmit(parame:UploadFileDto) {
        console.log(parame);
        if(parame.id_part ==0 ){
            let newView = {
                ...parame
            };
            //console.log(newView);
            //createView(newView);
//            createTask(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            //console.log(view);
            //updateView(view);
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
        }
    }

    return (
        <>
            <>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        <h4>Model Management</h4>




                        <Formik
                            validationSchema={validationSchema}
                            enableReinitialize 
                            initialValues={fileparam} 
                            onSubmit={values => handleFormSubmit(values)}>
                            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                                    <TextInputGeneral label='Title' name='title' placeholder='Light Title' />
                                    <FileInputGeneral label='file' name='file_data' />

                                    <hr />
                                    
                                    
                                    <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                                </Form>
                            )}

                        </Formik>
                        <div>
                            <Link to={`/modelfile/${id}`}>Details</Link> 
                        </div>

                    </div>
                </div>
            </>
        </>
    )
})

