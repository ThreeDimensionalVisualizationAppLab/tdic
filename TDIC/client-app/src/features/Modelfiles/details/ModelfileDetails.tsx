import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import PartViewer from "./PartViewer";




export default observer( function ModelfileDetails() {

    const {id} = useParams<{id:string}>();

    const {modelfileStore} = useStore();
    const {selectedModelfile, setSelectedModelfile, loading, setLoaing} = modelfileStore;
    const [update,setUpdata]=useState<boolean>(false)

    //setSelectedModelfile(Number(id));

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

                        <h4>Model Management</h4>


                        <div className="row" id="model_screen" style={{ width: 640, height : 360 }}>
                            {
                                <PartViewer id_part={Number(id)}/>
                            }
                        </div>

                        <hr />

                        <dl className="row">
                            <dt className="col-sm-2">
                                Part Number
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.part_number}
                            </dd>
                            <dt className="col-sm-2">
                                Version
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.version}
                            </dd>
                            <dt className="col-sm-2">
                                Create Datetime
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.create_datetime}
                            </dd>
                            <dt className="col-sm-2">
                                DATA TYPE
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.type_data}
                            </dd>
                            <dt className="col-sm-2">
                                Format
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.format_data}
                            </dd>
                            <dt className="col-sm-2">
                                FileSize[KB]
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.file_length / 1000}
                            </dd>
                            <dt className="col-sm-2">
                                Item Link
                            </dt>
                            <dd className="col-sm-10">
                                <a href={selectedModelfile?.itemlink} target="_blank" rel="noopener noreferrer">{selectedModelfile?.itemlink}</a>
                            </dd>
                            <dt className="col-sm-2">
                                License
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.license}
                            </dd>
                            <dt className="col-sm-2">
                                Author
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.author}
                            </dd>
                            <dt className="col-sm-2">
                                Memo
                            </dt>
                            <dd className="col-sm-10">
                                {selectedModelfile?.memo}
                            </dd>
                        </dl>

                        <hr />

                        <div>
                            <Link to="/modelfiles">Return Index</Link> |
                            <Link to={`/modelfileedit/${id}`}>Edit</Link>
                        </div>

                    </div>
                </div>
            </>
        </>
    )
})

