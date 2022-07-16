import {  makeAutoObservable, runInAction } from "mobx";
import { Quaternion, Vector3 } from 'three';

export default class SceneInfoStore {
    camera_pos : Vector3 | undefined = undefined;
    orbit_target : Vector3 | undefined = undefined;
    quaternion : Quaternion | undefined = undefined;

    
    target_camera_pos : Vector3 | undefined = undefined;
    mode_transport : boolean = false;

    selectedInstructionId =0;

    constructor(){
        makeAutoObservable(this)
    }

    setCamarePos = (pos:Vector3) => {
        this.camera_pos = pos;
    }

    setCamareQuaternion = (quaternion:Quaternion) => {
        this.quaternion = quaternion;
    }

    setOrbitTarget = (pos:Vector3) => {
        this.orbit_target = pos;
    }

    setSelectedInstructionId = (id:number) => {
        this.selectedInstructionId = id;
    }

    setModeTransport = (state:boolean) => {
        this.mode_transport = state;
    }


}