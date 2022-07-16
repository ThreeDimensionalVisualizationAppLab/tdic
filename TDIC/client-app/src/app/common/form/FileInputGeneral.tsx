import { Field, FieldProps, useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Form } from 'react-bootstrap'

/*
interface Props{
    //placeholder: string;
    name:string;
    //type?: string;
    label?: string;
    component?: string;
}
*/

type FormikImageFieldProps = InputHTMLAttributes<HTMLElement> & {
    label: string;
    name: string;
    component?: string;
  };

/*
export default function FileInputGeneral(props: FormikImageFieldProps){
//    const[field, meta] = useField(props.name);
    const [field, { error, touched }, helper] = useField<FieldProps>(props);

*/
const FileInputGeneral: React.FC<FormikImageFieldProps> = ({
    label,
    size: _,
    ...props
    }) => {
    const [field, { error, touched }, helper] = useField<FieldProps>(props);

    return (
        <>
            <Field
                {...field}
                {...props}
                type="file"
                onChange={(e: any) => {
                    helper.setValue(e.currentTarget.files);
                    console.log(e.currentTarget.files);
                }}
                id={field.name}
                className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 ${
                touched && error ? "border-red-600" : ""
                }`}
            />
        </>
    )
}

//https://stackoverflow.com/questions/65051992/cant-upload-file-with-usefield-in-formik


export default FileInputGeneral;