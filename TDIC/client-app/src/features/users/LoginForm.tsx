import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form } from "react-bootstrap";
import TextInputGeneral from "../../app/common/form/TextInputGeneral";
import { useStore } from "../../app/stores/store";

export default observer( function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error:'Invalid email or password'}))}
            >
                {({handleSubmit, isSubmitting, errors}) =>(
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Login</h3>
                        <TextInputGeneral name='email' placeholder="Email" />
                        <TextInputGeneral name='password' placeholder="Password" type="password" />
                        <ErrorMessage 
                            name='error' render={() => 
                                <>
                                    {
                                        //<Label style = {{marginBottom:10}} basic color='red' content ={errors.error} />
                                    }
                                    <Form.Label style = {{marginBottom:10}} basic color='red' >{errors.error}</Form.Label>
                                </>
                        }
                        />
                        <button type = 'submit' className="btn btn-primary">Login</button>
                    </Form>
                )}
            </Formik>
    )
})