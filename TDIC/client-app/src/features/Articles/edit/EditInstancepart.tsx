
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import { Instancepart } from '../../../app/models/Instancepart';


export default observer( function EditInstancepart(){
    const history = useHistory();
    
    const {instancepartStore} = useStore();
    const {instancepartRegistry, updateInstancepart} = instancepartStore;

    const [instanceparts, setInstancepart] = useState<Instancepart[]>([]);


    useEffect(()=>{
        instancepartRegistry && setInstancepart(Array.from(instancepartRegistry.values()));
    }, []);

    useEffect(()=>{
        instancepartRegistry && setInstancepart(Array.from(instancepartRegistry.values()));
    }, [instancepartRegistry]);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    
    function handleFormSubmit(instanceparts:Instancepart[]) {
        updateInstancepart(instanceparts);
    }

    

    if(instanceparts.length<1) return null;

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={instanceparts} 
                onSubmit={(values) => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        X
                                    </th>
                                    <th>
                                        Y
                                    </th>
                                    <th>
                                        Z
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {                                
                                instanceparts.map((x,index)=>(
                                    <tr key={x.id_inst}>
                                        <td><div>{index+1}</div></td>
                                        <td><div>{x.id_inst}</div></td>
                                        <td><TextInputGeneral name={`[${index}]pos_x`} placeholder='POS X' /></td>
                                        <td><TextInputGeneral name={`[${index}]pos_y`} placeholder='POS Y' /></td>
                                        <td><TextInputGeneral name={`[${index}]pos_z`} placeholder='POS Z' /></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>Submit</button>
                    </Form>
                )}

            </Formik>
        </div>
    )
})