import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DebugDisplay from "../common/DebugDisplay";
import PanelInstruction from "../details/PanelInstruction";
import EdiaAnnotationDisplay from "./EditAnnotationDisplay";
import EditAnnotation from "./EditAnnotation";
import EdiaInstruction from "./EditInstruction";
import EditView from "./EditView";
import EditLightList from "./EditLightList";
import EditLight from "./EditLight";
import EditInstancepart from "./EditInstancepart";
import EditArticleSub from "./EditArticleSub";
import EditViewList from "./EditViewList";
import ModelScreen from "../common/modelscreen/ModelScreen";
import EditEyecatch from "./EditEyecatch";




export default observer( function ArticleEdit() {

    const html_id_instruction = "instruction_description_zone";
    
    const {id} = useParams<{id:string}>();
    const [descriptionAreaHeight, setDescriptionAreaHeight] = useState(document.documentElement.clientHeight);

    const [isDataLoading, setIsDataLoading]= useState<boolean>(true);

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle, loading : isArticleLoading} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, setSelectedInstruction, instructionRegistry, loading : isInstructionLoading} = instructionStore;


    const {instancepartStore} = useStore();
    const {loadInstanceparts, instancepartRegistry, loading : isInstancepartLoading} = instancepartStore;
    
    const {viewStore} = useStore();
    const {loadViews, setselectedView, loading : isViewLoading} = viewStore;
    
    const {annotationStore} = useStore();
    const {loadAnnotations, loading : isAnnotationLoading} = annotationStore;
    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, selectedAnnotationDisplayMap, loading : isAnnotationDisplayLoading} = annotationDisplayStore;
    
    const {lightStore} = useStore();
    const {loadLights, loading : isLightLoading} = lightStore;
    
    function handleResize() {
    //    if(document.getElementById(html_id_instruction)!=null){
        const size = document.documentElement.clientHeight - document.getElementById(html_id_instruction)!.getBoundingClientRect().top;
        setDescriptionAreaHeight(size);
    //    }
    }

    useEffect(() => {
    
        window.addEventListener('resize', handleResize)
    
        return () => {
          window.removeEventListener('resize', handleResize)
        }
    })

    useEffect(() => { 
        setIsDataLoading(
            isArticleLoading 
         || isInstructionLoading
         || isViewLoading 
         || isInstancepartLoading 
         || isLightLoading 
         || isAnnotationLoading 
         || isAnnotationDisplayLoading
         );

    },[isArticleLoading, isInstructionLoading, isViewLoading, isInstancepartLoading, isLightLoading, isAnnotationLoading, isAnnotationDisplayLoading])


    useEffect(()=> {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        selectedInstruction && setSelectedAnnotationDisplayMap(selectedInstruction.id_instruct);

    }, [selectedInstruction])

    useEffect(()=> {

        if(!isInstructionLoading && !isViewLoading)  {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        }
        
    }, [isInstructionLoading,isViewLoading])

    useEffect(()=> {

        if(id) {
            loadArticle(Number(id)).then(x=>{x && loadInstanceparts(x.id_assy)});
            loadInstructions(Number(id));
            loadViews(Number(id));
            loadAnnotations(Number(id));
            loadLights(Number(id));
            loadAnnotationDisplays(Number(id));
        } else {
        }

    }, [id])


    if(isDataLoading) return (<><LoadingComponent /><DebugDisplay /></>);
    

    const handleInputChangeInstruction=(id_instruct: number) => {
        handleResize();
        setSelectedInstruction(id_instruct);
    }




    return (
        <>
            {id && <h2>{article?.title}</h2> }

                <Row>
                    <Col  sm={6} >
                    {
                        id && <ModelScreen height="45vh" width='45vw' />
                    }
                        <div>
                            { instructionRegistry.size>0 &&
                                Array.from(instructionRegistry.values()).map(x=>(
                                    <button key={x.id_instruct}
                                        type = 'submit'
                                        className={x.id_instruct==selectedInstruction?.id_instruct ? "btn btn-primary" : "btn btn-outline-primary"}
                                        onClick={()=>{handleInputChangeInstruction(x.id_instruct)}} 
                                    >
                                        {x.title}
                                    </button>
                                ))
                            }
                        </div>
                    </Col>
                    <Col  sm={6} >
                        <Tabs defaultActiveKey="instruction" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="instruction" title="Instruction">
                                <EdiaInstruction />
                                <div id={html_id_instruction} className="overflow-auto" style={{'height':`${descriptionAreaHeight}px`}}>
                                    {
                                        selectedInstruction && <PanelInstruction instruction={selectedInstruction} />
                                    }
                                </div>
                            </Tab>
                            <Tab eventKey="view" title="View">
                                {id && <EditView /> }
                                <hr />
                                {id && <EditViewList /> }
                            </Tab>
                            <Tab eventKey="annotation" title="Annotation" >
                                {id && <EditAnnotation /> }
                                {
                                    selectedAnnotationDisplayMap.size > 0 && <EdiaAnnotationDisplay />
                                }
                            </Tab>
                            <Tab eventKey="displayItemsInfo" title="Display Items Info" >
                                <p>abxxxxxx</p>
                            </Tab>
                            <Tab eventKey="light" title="Light" >
                                {id && <EditLight /> }
                                <hr />
                                {id && <EditLightList /> }
                            </Tab>
                            <Tab eventKey="instance" title="Instance" >
                                {
                                    instancepartRegistry.size > 0 && <EditInstancepart />
                                }
                            </Tab>
                            <Tab eventKey="articleBase" title="Article Base" >
                                <EditArticleSub /> 
                            </Tab>
                            <Tab eventKey="thumbnail" title="Thumbnail" >
                                <EditEyecatch />
                            </Tab>
                            <Tab eventKey="materials" title="Materials" >
                                <p>abxxxxxx</p>
                            </Tab>
                            <Tab eventKey="info" title="info" >
                                <Link to={`/article/${Number(article?.id_article)}`}>Details</Link> 
                                <hr />
                                <p>{descriptionAreaHeight}</p>
                                <DebugDisplay />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
        </>


    )
})