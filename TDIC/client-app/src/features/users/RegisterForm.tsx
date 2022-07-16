import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form } from "react-bootstrap";
import TextInputGeneral from "../../app/common/form/TextInputGeneral";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup'
import ValidationErrors from "../errors/ValidationErrors";

export default observer( function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{displayName: '', email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) =>(
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Sigh up to Tasket</h3>
                        <TextInputGeneral name='displayName' placeholder="display Name" />
                        <TextInputGeneral name='username' placeholder="User Name" />
                        <TextInputGeneral name='email' placeholder="Email" />
                        <TextInputGeneral name='password' placeholder="Password" type="password" />
                        <ErrorMessage 
                            name='error' render={() => 
                            <ValidationErrors errors = {errors.error} />}
                        />
                        {
                        //<Button disabled={!isValid || !dirty || isSubmitting} 
                        //    loading={isSubmitting} positive content ='Register' type = 'submit' fluid />

                        }
                        <button type = 'submit' className="btn btn-primary">Submit</button>
                    </Form>
                )}
            </Formik>
    )
})