import { color } from 'csx';
import { useControls } from 'leva';
import React, { useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Effects } from './Effect';



type LightsProps = {
	position: [number, number, number]
    size:number;
}


export const Lights: VFC<LightsProps> = ({ position, size }) => {
	return (
		<>
			{
            //    <ambientLight intensity={0.05} />
            }
			{
			    <PointLight size={size} position={position} />
            }
            {
                <Effects />
            }
		</>
	)
}

type PointLightProps = {
	position: [number, number, number]
    size:number;
}

const PointLight: VFC<PointLightProps> = ({ position, size }) => {
	// add controller
	//const datas = useController()

    const datas = {
		size: 4.5,
		color: '#b77f37',
		helper: false
	}

    
	// add helper
	const lightRef = useRef<THREE.Light>()
	useHelper(lightRef, THREE.PointLightHelper, [datas.helper ? 1 : 0])

	const meshRef = useRef<THREE.Mesh>()
	const { scene } = useThree()

	useEffect(() => {
		if (!scene.userData.refs) scene.userData.refs = {}
		scene.userData.refs.lightMesh = meshRef
	}, [scene.userData])

	useEffect(() => {
		meshRef.current!.lookAt(0, 0, 0)
	}, [])


    //SphereGeometry( 15, 32, 16 );
	return (
		<mesh ref={meshRef} position={position}>
            {
                //<circleGeometry args={[datas.size, 64]} />
            }
            <sphereGeometry args={[size, 64]} />
			<meshBasicMaterial color={datas.color} side={THREE.DoubleSide} />
			<pointLight
				ref={lightRef}
				color={color(datas.color).lighten(0.5).toHexString()}
				intensity={0}
                decay={0}
                distance={0}
				//shadow-mapSize-width={512}
				//shadow-mapSize-height={512}
				//castShadow
			/>
		</mesh>
	)
}

const PointLightEditor: VFC<PointLightProps> = ({ position }) => {
	// add controller
	const datas = useController()

	// add helper
	const lightRef = useRef<THREE.Light>()
	useHelper(lightRef, THREE.PointLightHelper, [datas.helper ? 1 : 0])

	const meshRef = useRef<THREE.Mesh>()
	const { scene } = useThree()

	useEffect(() => {
		if (!scene.userData.refs) scene.userData.refs = {}
		scene.userData.refs.lightMesh = meshRef
	}, [scene.userData])

	useEffect(() => {
		meshRef.current!.lookAt(0, 0, 0)
	}, [])

    //SphereGeometry( 15, 32, 16 );
	return (
		<mesh ref={meshRef} position={position}>
            {
                //<circleGeometry args={[datas.size, 64]} />
            }
            <sphereGeometry args={[1000, 64]} />
			<meshBasicMaterial color={datas.color} side={THREE.DoubleSide} />
			<pointLight
				ref={lightRef}
				color={color(datas.color).lighten(0.5).toHexString()}
				intensity={0}
                decay={0}
                distance={0}
				//shadow-mapSize-width={512}
				//shadow-mapSize-height={512}
				//castShadow
			/>
		</mesh>
	)
}

const useController = () => {
	const datas = useControls('light', {
		size: {
			value: 4.5,
			min: 0.2,
			max: 10,
			step: 0.1
		},
		color: '#b77f37',
		helper: false
	})
	return datas
}
