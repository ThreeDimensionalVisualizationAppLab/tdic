import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import "./CardStyle.css"

export default observer( function ArticleList() {
    const {userStore: {user}} = useStore();
    const {articleStore } = useStore();
    const {articleRegistry} = articleStore;

    return (
        <>
        <Row>


            { 
                Array.from(articleRegistry.values()).map(x=>(
                    <Col>
                        <Card key={x.id_article} style={{ width: '24rem',  height: '30rem'}} className="article-dashboard-card" >
                            <Link to={`/article/${x.id_article}`}>
                                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + `/attachmentfiles/file/${x.id_attachment_for_eye_catch}`} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{x.title}</Card.Title>
                                { user && <Link to={`/articleedit/${x.id_article}`}>Edit</Link> }
                                <Card.Text>{x.short_description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
            )) }

        </Row>
        </>


    )
})