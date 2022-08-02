import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react';
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


export default function ModelfileViewer({id_part}: Props){

  return (
      <Canvas
        style={{background: 'white'}}
        camera={{position:[3,3,3]}} >
          <ambientLight intensity={1.5} />
          <directionalLight intensity={0.6} position={[0, 2, 2]} />
          { 
            <UseModel id_part={id_part} /> 
          }
          
        <OrbitControls target={[0, 0, 0]}  makeDefault />
        <axesHelper args={[2]}/>
        <gridHelper args={[2]}/>
      </Canvas>
  );
};