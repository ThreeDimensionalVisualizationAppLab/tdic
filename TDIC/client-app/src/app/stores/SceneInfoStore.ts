import {  makeAutoObservable, runInAction } from "mobx";
import { Quaternion, Vector3 } from 'three';

export default class SceneInfoStore {
    camera_pos : Vector3 | undefined = undefined;
    orbit_target : Vector3 | undefined = undefined;
    quaternion : Quaternion | undefined = undefined;

    
    target_camera_pos : Vector3 | undefined = undefined;
    mode_transport : boolean = false;

    screen_shot_trigger : boolean = true;
    screen_shot : string = "";

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

    setScreenShot = (screen_shot:string) => {
        this.screen_shot = screen_shot;
    }

    setScreenShotTrigger = () => {
        console.log("calledxxx");
        this.screen_shot_trigger = !this.screen_shot_trigger;
    }


}