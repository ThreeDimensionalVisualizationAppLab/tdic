//import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function ModelfileCreate() {

  const [file, setFile] = useState<File>()

//  const abc : File;
//  abc.name

  function handleChange(event: any) {
    console.log(event);
    if (event.target.files) {
        setFile(event.target.files[0]);

    }
  }
  
  function handleSubmit(event: any) {
    event.preventDefault()
//    const url = 'https://localhost:5001/api/modelfiles/uploadfile';
    const url = process.env.REACT_APP_API_URL + '/modelfiles/uploadfile';
    const formData = new FormData();

    if(file){
        
        formData.append('file', file);
//        formData.append('FileName', file.name);

//        console.log(file.name);
        const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
        };
//        axios.post(url, formData, config).then((response) => {
        axios.post(url, formData).then((response) => {
        console.log(response.data);
        });
    }

  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default ModelfileCreate;


/*

import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';


export default observer( function ModelfileCreate() {

    const {id} = useParams<{id:string}>();

    const {modelfileStore} = useStore();
    const {selectedModelfile, setSelectedModelfile, loading, setLoaing} = modelfileStore;
    const [update,setUpdata]=useState<boolean>(false)

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


    return (
        <>
            <>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        
                        <hr />

                        <div>
                            <Link to="/ContentsEdit/ContentsModelFile">Return Index</Link> |
                            {<Link to={`/ContentsEdit/ModelFileEdit/${id}`}>Edit</Link>} |
                            {<Link to={`/ContentsEdit/ModelFileDelete/${id}`}>Delete</Link>}
                        </div>

                    </div>
                </div>
            </>
        </>
    )
})


*/