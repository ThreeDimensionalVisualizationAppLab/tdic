import { Canvas, useFrame, useThree, extend, ReactThreeFiber, useLoader, Vector3 } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';


interface Props {
  id_part: number;
}

const UseModel  = ({id_part}: Props) => {
  return (
      <React.Suspense fallback={null}>
          <LoadModel id_part={id_part} />
      </React.Suspense>
  )
}


const LoadModel  = ({id_part}: Props) => {

  const str_url_partapi = process.env.REACT_APP_API_URL + `/modelfiles/file/${id_part}`
  const gltf = useLoader(GLTFLoader, str_url_partapi);

  return (
      <primitive object={gltf.scene} dispose={null} />
  )
}


export default function PartViewer({id_part}: Props){

  const  [p1, setP1] = useState(0);
  const  [currentTarteg, setCurrentTarteg] = useState<Vector3>([0, 0, 0]);

  const setstate1=() => {
    setP1(p1+1);
    setCurrentTarteg([0, 0, 100]);
    
    //console.log("called");
  }



  return (
    <>
      <Canvas
        style={{background: 'white'}}
        camera={{position:[3,3,3]}} >
          <ambientLight intensity={1.5} />
          <directionalLight intensity={0.6} position={[0, 2, 2]} />
          { 
            <UseModel id_part={id_part} /> 
          }
          {
            <ChgView target_pos={[0, 2, 2]}  p1={p1}/>
          }
          
        <OrbitControls target={[0, 0, 0]}  makeDefault />
        <axesHelper args={[2]}/>
        <gridHelper args={[2]}/>
      </Canvas>
      <div>
      <button className='btn btn-primary' onClick={setstate1} >CngView</button>
      </div>
    </>
  );
};



interface PropsCameraGoal {
  target_pos: Vector3;
  p1:number;
}

const ChgView  = ({target_pos, p1}: PropsCameraGoal) => {
  let count=0;
  //console.log("called2");
  useFrame((state) => {
    if(count<100){
      state.camera.position.y += 0.1;
      
      count++;
    }
//      state.camera.lookAt(Math.sin(state.clock.getElapsedTime()) * 30, Math.sin(state.clock.getElapsedTime()) * 30, Math.sin(state.clock.getElapsedTime()) * 30);
//      state.camera.updateProjectionMatrix()
  })
  return null
}