import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Instancepart } from "../models/Instancepart";

export default class InstancepartStore {
    instancepartRegistry = new Map<number, Instancepart>();
    selectedInstancepart: Instancepart| undefined = undefined;
    loading=false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadInstanceparts = async (id_assy:number) => {
        this.loading = true;
        this.loadingInitial = true;
        this.instancepartRegistry.clear();
        try {
            const instanceparts = await agent.Instanceparts.list(id_assy);
            instanceparts.forEach(instancepart => {
                this.setInstancepart(instancepart);
            })
            this.setIsLoading(false);
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
            this.setLoaingInitial(false);
        }
    }

    setSelectedInstancepart = async (id_inst:number) => {
        let instancepart = this.getInstancepart(id_inst);
        if(instancepart) {
            this.selectedInstancepart = instancepart;
            runInAction(()=>{
                this.selectedInstancepart = instancepart;
            })
            return instancepart;
        } /*else {
            this.loadingInitial = true;
            try {
                instruction = await agent.Instructions.details(id_article,id_instruct);
                this.setInstruction(instruction);
                runInAction(()=>{
                    this.selectedInstruction = instruction;
                })
                this.setLoaingInitial(false);
                return instruction;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }*/
    }


    updateInstancepart = async (objects: Instancepart[]) => {
        this.loading = true;
        
        try {
            //console.log("upd called");
            await agent.Instanceparts.update(objects);
            runInAction(() => {
//                this.lightRegistry.set(object.id_light, object);
//                this.selectedLight = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private setInstancepart = (instancepart : Instancepart) => {
        this.instancepartRegistry.set(instancepart.id_inst,instancepart);
    }

    private getInstancepart=(id_inst:number) => {
        return this.instancepartRegistry.get(id_inst);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    setIsLoading = (state: boolean) => {
        this.loading = state;
    }
}