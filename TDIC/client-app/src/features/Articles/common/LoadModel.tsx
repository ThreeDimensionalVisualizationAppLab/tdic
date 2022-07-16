import { useLoader } from '@react-three/fiber';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react';








interface PartProps {
    id_part: number;
    pos:Vector3;
}



const LoadModel  = ({id_part, pos}: PartProps) => {
    return (
        <React.Suspense fallback={null}>
            <LoadModelSub id_part={id_part} pos={pos} />
        </React.Suspense>
    )
}  



const LoadModelSub  = ({id_part, pos}: PartProps) => {

  
    const str_url_partapi = process.env.REACT_APP_API_URL + `/modelfiles/file/${id_part}`;
    const gltf = useLoader(GLTFLoader, str_url_partapi);
    gltf.scene.position.set(pos.x,pos.y,pos.z);
    //console.log(id_part);
  
    return (
        <primitive object={gltf.scene} dispose={null} />
    )
  }



  export default LoadModel;