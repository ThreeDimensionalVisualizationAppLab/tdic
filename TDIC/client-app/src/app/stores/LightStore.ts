import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Light } from "../models/Light";

export default class LightStore {
    lightRegistry = new Map<number, Light>();
    selectedLight: Light| undefined = undefined;
    loading=false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadLights = async (id_article:number) => {
        this.loading = true;
        this.loadingInitial = true;
        this.lightRegistry.clear();
        try {
            const lights = await agent.Lights.list(id_article);
            lights.forEach(light => {
                this.setLight(light);
            })
            this.setIsLoading(false);
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
            this.setLoaingInitial(false);
        }
    }

    setSelectedLight = async (id_light:number) => {
        let light = this.getLight(id_light);
        if(light) {
            this.selectedLight = light;
            runInAction(()=>{
                this.selectedLight = light;
            })
            return light;
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

    
    
    createLight = async (object: Light) => {
        this.loading = true;
        console.log("called light create");
        try {
            await agent.Lights.create(object);
            runInAction(() => {
                this.lightRegistry.set(object.id_light, object);
                this.selectedLight = object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateLight = async (object: Light) => {
        this.loading = true;
        
        try {
            await agent.Lights.update(object);
            runInAction(() => {
                this.lightRegistry.set(object.id_light, object);
                this.selectedLight = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    

    
    deleteLight = async (object: Light) => {
        this.loading = true;
        
        try {
            await agent.Lights.delete(object.id_article, object.id_light);
            runInAction(() => {
                this.lightRegistry.delete(object.id_light);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    


    private setLight = (object : Light) => {
        this.lightRegistry.set(object.id_light,object);
    }

    private getLight=(id_light:number) => {
        return this.lightRegistry.get(id_light);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoading = (state: boolean) => {
        this.loading = state;
    }
}