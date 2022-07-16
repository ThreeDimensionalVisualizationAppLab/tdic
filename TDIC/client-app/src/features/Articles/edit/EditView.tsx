
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import { View } from '../../../app/models/view';
import { Col, Row } from 'react-bootstrap';


export default observer( function EditView(){
    const history = useHistory();
    
    const {viewStore} = useStore();
    const {selectedView, updateView, createView, deleteView} = viewStore;

    const {sceneInfoStore : {camera_pos, quaternion, orbit_target}} = useStore();

    const [view, setView] = useState<View>({
        id_article: 0,
        id_view: 0,
        title: '',
        cam_pos_x: 0,
        cam_pos_y: 0,
        cam_pos_z: 0,
    
        cam_lookat_x: 0,
        cam_lookat_y: 0,
        cam_lookat_z: 0,
    
        cam_quat_x: 0,
        cam_quat_y: 0,
        cam_quat_z: 0,
        cam_quat_w: 0,
    
        obt_target_x: 0,
        obt_target_y: 0,
        obt_target_z: 0,
    });


    const validationSchema = Yup.object({
        id_view: Yup.number().required(),
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.number().required(),
        id_view: Yup.number().required(),
    });
    

    useEffect(()=>{
        selectedView && setView(selectedView);
    }, [selectedView]);

    
    function handleFormSubmit(view:View) {
        if(view.id_view ==0 ){
            let newView = {
                ...view
            };
            console.log(newView);
            createView(newView);
        } else {
            updateView(view);
        }
    }

    
    function handleFormSubmitDelete(view:View) {
        if(view){
            deleteView(view);
        } else {
        }
    }


    //ビュー情報をカメラ・オービットから更新する
    function handleSetNowView() {
        setView({
            id_article: view.id_article,
            id_view: view.id_view,
            title: view.title,
            cam_pos_x: camera_pos?.x!,
            cam_pos_y: camera_pos?.y!,
            cam_pos_z: camera_pos?.z!,
        
            cam_lookat_x: view.cam_lookat_x,
            cam_lookat_y: view.cam_lookat_y,
            cam_lookat_z: view.cam_lookat_z,
        
            cam_quat_x: quaternion?.x!,
            cam_quat_y: quaternion?.y!,
            cam_quat_z: quaternion?.z!,
            cam_quat_w: quaternion?.w!,
        
            obt_target_x: orbit_target?.x!,
            obt_target_y: orbit_target?.y!,
            obt_target_z: orbit_target?.z!,
        });
    }


    return(
        <div>         
            <h3>Task Details</h3> 
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={view} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={3}><TextInputGeneral label='View ID' name='id_view' placeholder='View ID' /></Col>
                            <Col xs={9}><TextInputGeneral label='title' name='title' placeholder='title' /></Col>
                        </Row>

                        <hr />

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Elementname</th>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                    <th>W</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Camera Position</td>
                                    <td><TextInputGeneral label='cam_pos_x' name='cam_pos_x' placeholder='cam_pos_x' /></td>
                                    <td><TextInputGeneral label='cam_pos_y' name='cam_pos_y' placeholder='cam_pos_y' /></td>
                                    <td><TextInputGeneral label='cam_pos_z' name='cam_pos_z' placeholder='cam_pos_z' /></td>
                                    <td></td>
                                </tr>                        
                                <tr>
                                    <td>Camera Look At</td>
                                    <td><TextInputGeneral label='cam_lookat_x' name='cam_lookat_x' placeholder='cam_lookat_x' /></td>
                                    <td><TextInputGeneral label='cam_lookat_y' name='cam_lookat_y' placeholder='cam_lookat_y' /></td>
                                    <td><TextInputGeneral label='cam_lookat_z' name='cam_lookat_z' placeholder='cam_lookat_z' /></td>
                                    <td></td>
                                </tr>
                                
                                <tr>
                                    <td>Camera Quaternion</td>
                                    <td><TextInputGeneral label='cam_quat_x' name='cam_quat_x' placeholder='cam_quat_x' /></td>
                                    <td><TextInputGeneral label='cam_quat_y' name='cam_quat_y' placeholder='cam_quat_y' /></td>
                                    <td><TextInputGeneral label='cam_quat_z' name='cam_quat_z' placeholder='cam_quat_z' /></td>
                                    <td><TextInputGeneral label='cam_quat_w' name='cam_quat_w' placeholder='cam_quat_w' /></td>
                                </tr>
                                
                                <tr>
                                    <td>Orbit Control Target</td>
                                    <td><TextInputGeneral label='obt_target_x' name='obt_target_x' placeholder='obt_target_x' /></td>
                                    <td><TextInputGeneral label='obt_target_y' name='obt_target_y' placeholder='obt_target_y' /></td>
                                    <td><TextInputGeneral label='obt_target_z' name='obt_target_z' placeholder='obt_target_z' /></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                        
                    </Form>
                )}

            </Formik>


            

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={view} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>Delete</button>
                    </Form>
                )}
            </Formik>


            <button
                type = 'submit'
                className={"btn btn-outline-primary"}
                onClick={()=>{handleSetNowView()}} 
            >
                upd
            </button>

        </div>
    )
})