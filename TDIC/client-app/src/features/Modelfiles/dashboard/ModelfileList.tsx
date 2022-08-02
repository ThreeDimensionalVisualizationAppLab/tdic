import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer( function ModelfileList() {
    const { modelfileStore } = useStore();
     const {ModelfileRegistry} = modelfileStore;

    return (
        <>
        <Row>
            { 
                Array.from(ModelfileRegistry.values()).map(x=>(
                    <Col>
                        <Card key={x.id_part} style={{ width: '24rem',  height: '30rem'}} className="article-dashboard-card" >
                            <Link to={`/modelfileedit/${x.id_part}`}>Link
                            </Link>
                            <Card.Body>
                                <Card.Title>{x.file_name}</Card.Title>
                                <Card.Text>{x.type_data}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )) 
            }
        </Row>                 
        </>


    )
})