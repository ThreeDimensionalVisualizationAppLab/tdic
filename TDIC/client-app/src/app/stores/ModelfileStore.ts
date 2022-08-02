import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Modelfile } from "../models/ModelFile";

export default class ModelfileStore {
    ModelfileRegistry = new Map<number, Modelfile>();
    selectedModelfile: Modelfile| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }


    get ModelfilesArray(){
        
        return Array.from(this.ModelfileRegistry.values());

            
    }
    get ModelfilesByDate(){
        
        return Array.from(this.ModelfileRegistry.values()).sort((a,b) => 
            a.create_datetime!.getTime() - b.create_datetime!.getTime());

            
    }

    get groupedModelfiles(){
        return Object.entries(
            this.ModelfilesByDate.reduce((modelfiles,modelfile) => {
                const id = modelfile.id_part;
                modelfiles[id] = modelfiles[id] ? [...modelfiles[id], modelfile] : [modelfile];
                return modelfiles;
            }, {} as {[key: number]: Modelfile[]})
        )
    }


    loadModelfiles = async () => {
        this.loadingInitial = true;
        this.loading = true;
        try {
            const modelfiles = await agent.Modelfiles.list();
            modelfiles.forEach(modelfile => {
                this.setModelfile(modelfile);
            })
            this.setLoaing(false);
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
        }
    }
    

    loadModelfile = async (id:number) => {
        this.loading = true;
        let object:Modelfile;
        console.log("called loadmodelfiles");
        try {
            console.log("called loadmodelfiles");
            object = await agent.Modelfiles.details(id);
            this.setModelfile(object);
            runInAction(()=>{
                this.selectedModelfile = object;
            })
            this.setLoaing(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
        
    }

    
    updateModelfile = async (object: Modelfile) => {
        this.loading = true;
        
        try {
            await agent.Modelfiles.update(object);
            runInAction(() => {
                this.ModelfileRegistry.set(object.id_part, object);
                this.selectedModelfile = object;
//                this.editMode=false;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    setSelectedModelfile = async (id_part:number) => {
        let modelfile = this.getModelfile(id_part);
        if(modelfile) {
            runInAction(()=>{
                this.selectedModelfile = modelfile;
            })
            return modelfile;
        } else {
            this.loadingInitial = true;
            try {
                modelfile = await agent.Modelfiles.details(id_part);
                this.setModelfile(modelfile);
                runInAction(()=>{
                    this.selectedModelfile = modelfile;
                })
                this.setLoaingInitial(false);
                return modelfile;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }
    }
    

    private setModelfile = (modelfile : Modelfile) => {
        this.ModelfileRegistry.set(modelfile.id_part,modelfile);
    }

    private getModelfile=(id:number) => {
        return this.ModelfileRegistry.get(id);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoaing = (state: boolean) => {
        this.loading = state;
    }


}