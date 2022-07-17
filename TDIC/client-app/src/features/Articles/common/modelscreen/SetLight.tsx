import { extend, ReactThreeFiber, useLoader, useThree } from '@react-three/fiber';
import  { PointLight, TextureLoader, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React from 'react';
import { Light } from '../../../../app/models/Light';


import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { Lights } from './Lights';



extend({ Lensflare, LensflareElement });



// インターフェイスIntrinsicElementsにorbitControls の定義を追加
declare global {
    namespace JSX {
      interface IntrinsicElements {
        lensflare: ReactThreeFiber.Node<Lensflare, typeof Lensflare>
        lensflareElement: ReactThreeFiber.Node<LensflareElement, typeof LensflareElement>
      }
    }
  }


interface Props {
    light:Light;
}



const SetLight  = ({light}: Props) => {

    
  const { scene } = useThree();
  //  const orbitControls = ((scene as any).orbitControls as any);

  
    if(light.light_type=='DirectionalLight'){
        return (
            <directionalLight intensity={light.intensity} position={[light.px, light.py, light.pz]} />
        )
    }else if(light.light_type=='AmbientLight'){
        return (
            <ambientLight intensity={light.intensity*0.3} />
        )
    }else if(light.light_type=='PointLight'){

        return <Lights size={light.lfsize*3} position={ [light.px, light.py, light.pz] }/>;

  /*      
        // light
        const light_object = new PointLight(light.color, light.intensity, light.distance, light.decay);
        console.log(light.pz);
        light_object.position.set(light.px, light.py, light.pz);


        if (light.is_lensflare) {
            //------------------------------------------------------------
            //このローダーは本来はもっと別の場所にあるが、暫定的にここに移した
            // lensflares
            const textureLoader = new TextureLoader();

            const textureFlare0 = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');

            //const textureFlare0 = textureLoader.load('');

            //const textureFlare0 = textureLoader.load(this.path_lf_png);


            const lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(textureFlare0, light.lfsize, 0.15, light_object.color));
            light_object.add(lensflare);

            scene.add(light_object);

            return null;
            //-------------------------------------------------------------

        }
*/


//https://stackoverflow.com/questions/72511173/lensflare-issue-in-three-js
/*
        const textureLoader = new TextureLoader();
        const textureFlare0 = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
        return (
            <pointLight intensity={light.intensity} position={[light.px, light.py, light.pz]} distance={light.distance} decay = {light.decay}>                
                <lensflare>
                    <lensflareElement texture={textureFlare0} size={light.lfsize} distance={0} />
                </lensflare>
            </pointLight>
        )
        */
    }





    return (
        null
    )
}  





  export default SetLight;