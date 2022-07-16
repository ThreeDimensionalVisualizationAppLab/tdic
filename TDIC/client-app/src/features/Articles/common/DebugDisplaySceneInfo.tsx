import { useEffect, useRef, useState } from 'react';
import { useStore } from "../../../app/stores/store";
import { Quaternion, Vector3 } from 'three';
import Bool2String from './Bool2String';



// ループで実行したい処理 を callback関数に渡す
const useAnimationFrame = (callback = () => {}) => {
    const reqIdRef = useRef<number>();
    const loop = () => {
      reqIdRef.current = requestAnimationFrame(loop);
      callback();
    };
  
    useEffect(() => {
      reqIdRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(reqIdRef.current!);
    }, []);
  };
  



  const DebugDisplaySceneInfo = () => {
    const {sceneInfoStore} = useStore();
    const [cam_pos, setCamPos] = useState(new Vector3(0,0,0));
    const [target, setTarget] = useState(new Vector3(0,0,0));
    const [quaternion, setQuaternion] = useState(new Quaternion(0,0,0,0));
    const [mode_transport, setmode_transport] = useState(false);
    
    //const {sceneInfoStore} = useStore();
//    const [quaternion, setQuaternion] = useState(new Quaternion(0,0,0,0));
  
    useAnimationFrame(() => {
      setCamPos(new Vector3(sceneInfoStore?.camera_pos?.x!,sceneInfoStore?.camera_pos?.y!,sceneInfoStore?.camera_pos?.z!));
      setTarget(new Vector3(sceneInfoStore?.orbit_target?.x!,sceneInfoStore?.orbit_target?.y!,sceneInfoStore?.orbit_target?.z!));
      setQuaternion(new Quaternion(sceneInfoStore?.quaternion?.x!,sceneInfoStore?.quaternion?.y!,sceneInfoStore?.quaternion?.z!,sceneInfoStore?.quaternion?.w!));
      setmode_transport(sceneInfoStore.mode_transport);
    });
  
    return (
      <div>
        <p>Mode TSP:{Bool2String(mode_transport)}</p>
        <table className="table">
            <thead>
                <tr>
                    <th>Elementname</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>Z</th>
                    <th>W</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Camera Position</td>
                    <td>{cam_pos?.x}</td>
                    <td>{cam_pos?.y}</td>
                    <td>{cam_pos?.z}</td>
                    <td></td>
                </tr>                        
                <tr>
                    <td>Camera Look At</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Camera Quaternion</td>
                    <td>{quaternion?.x}</td>
                    <td>{quaternion?.y}</td>
                    <td>{quaternion?.z}</td>
                    <td>{quaternion?.w}</td>
                </tr>
                <tr>
                    <td>Orbit Control Target</td>
                    <td>{target?.x}</td>
                    <td>{target?.y}</td>
                    <td>{target?.z}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>

      </div>
    );
  };


  
  export default DebugDisplaySceneInfo;