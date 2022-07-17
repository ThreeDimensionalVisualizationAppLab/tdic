import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../app/stores/store';
import { OrbitControls } from '@react-three/drei';
import THREE, { Color, Vector3 } from 'three';
import LoadModel from './LoadModel';
import SetLight from './SetLight';
import ShowAnnotation from './ShowAnnotation';
import UpdateCameraWork from './UpdateCameraWork';
import SceneInfoCatcher from './SceneInfoCatcher';
import { Effects } from './Effect';
import { Lights } from './Lights';


// ref https://codesandbox.io/s/draggable-mesh-rgn91?file=/src/App.tsx:900-940
//https://qiita.com/nemutas/items/c49728da8641ee28fd2e
//https://codesandbox.io/embed/react-three-fiber-suspense-zu2wo



interface Props {
  width : string;
  height : string;
}

export default observer( function ModelScreen({width, height}: Props) {

  const [isDebugMode, setIsDebugMode] = useState(false);
  
  const { articleStore } = useStore();
  const { selectedArticle } = articleStore;

  const { viewStore } = useStore();
  const { selectedView } = viewStore;
  
  const { annotationStore } = useStore();
  const { annotationRegistry, selectedAnnotation } = annotationStore;
    
  const {instructionStore} = useStore();
  const {selectedInstruction,  loading : isInstructionLoading} = instructionStore;
  
  const {annotationDisplayStore} = useStore();
  const {selectedAnnotationDisplayMap } = annotationDisplayStore;

  const { instancepartStore } = useStore();
  const { instancepartRegistry } = instancepartStore;
  
  const { lightStore } = useStore();
  const { lightRegistry } = lightStore;
  
  const { sceneInfoStore } = useStore();
  const { setModeTransport } = sceneInfoStore;
  


  useEffect(()=> {
    setModeTransport(true);
}, [selectedInstruction])

  return (
    <div style={{height:height, width:width}} >
      <Canvas
        gl={{ 
          antialias: true, 
          //toneMapping: NoToneMapping 
        }}
        onCreated={({ gl, scene }) => {
          //gl.toneMapping = THREE.ACESFilmicToneMapping
          //gl.outputEncoding = THREE.sRGBEncoding
          scene.background = new Color(selectedArticle?.bg_c)
        }}
        linear={!selectedArticle?.gammaOutput}        
        camera={{ 
          fov:45
          ,position:[3,3,3]
          ,near:1
          ,far:6350000
          }} >
        {
          Array.from(lightRegistry.values()).map(x=>(<SetLight key={x.id_light} light={x} />))
        }
        {
          Array.from(instancepartRegistry.values()).map(x=>(<LoadModel key={x.id_inst} id_part={x.id_part} pos={new Vector3(x.pos_x, x.pos_y, x.pos_z)}/>))
        }
        {
          selectedView && <UpdateCameraWork view={selectedView} isModeTransport={sceneInfoStore.mode_transport}/>
        }
        <OrbitControls enableDamping={false} attach="orbitControls" />

        { isDebugMode && <axesHelper args={[2]}/> }
        {
          <ShowAnnotation annotationMap={annotationRegistry} annotationDisplayMap={selectedAnnotationDisplayMap} selectedAnnotationId = {selectedAnnotation?.id_annotation}/>
        }

        
			{/* lights */}
			{
				//<Lights />
			}
      {
      //  <Effects />
      }
        {<SceneInfoCatcher />}
      </Canvas>
    </div>
  );
});