import { Vector3 } from 'three';
import { Html } from "@react-three/drei"
import "./styles.css"
import { Annotation } from '../../../../app/models/Annotation';
import { AnnotationDisplay } from '../../../../app/models/AnnotationDisplay';


interface Props {
    annotationMap : Map<number, Annotation>;
    annotationDisplayMap : Map<number, AnnotationDisplay>;
    selectedAnnotationId : number | undefined;
}



const ShowAnnotation  = ({annotationMap, annotationDisplayMap, selectedAnnotationId}: Props) => {
  
  return (
        <>
        {
          Array.from(annotationMap.values()).map(x=>(
            (annotationDisplayMap.get(x.id_annotation)?.is_display || x.id_annotation == selectedAnnotationId) && 
            <>
            <Html
              key={x.id_annotation} 
              position={new Vector3(x.pos_x+0.5,x.pos_y+0.5,x.pos_z+0.5)}
            >
              <div
                className={ x.id_annotation == selectedAnnotationId ? `model-annotation2 annotation_editmode` : `model-annotation2` }
              >
                <h4>{x.title}</h4>                
                {annotationDisplayMap.get(x.id_annotation)?.is_display_description && <p>{x.description1}</p>}
              </div>
            </Html>      
            <arrowHelper args={[new Vector3( -0.5, -0.5, -0.5 ).normalize(), new Vector3(x.pos_x+0.5,x.pos_y+0.5,x.pos_z+0.5),Math.sqrt(0.5*0.5*3), "red"]} />
            </>
          ))          
        }
        { annotationMap.get(selectedAnnotationId ? selectedAnnotationId : 0) && <axesHelper args={[1]} position = {[annotationMap.get(selectedAnnotationId!)?.pos_x!,annotationMap.get(selectedAnnotationId!)?.pos_y!,annotationMap.get(selectedAnnotationId!)?.pos_z!]} /> }
        </>
    )
}


export default ShowAnnotation;