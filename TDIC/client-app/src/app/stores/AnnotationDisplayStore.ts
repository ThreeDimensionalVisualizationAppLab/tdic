import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { AnnotationDisplay } from "../models/AnnotationDisplay";

export default class AnnotationDisplayStore {
    annotationDisplayRegistry = new Map<number, AnnotationDisplay>();
    annotationDisplayArray:AnnotationDisplay[] = [];
    selectedAnnotationDisplayMap = new Map<number, AnnotationDisplay>();
    selectedAnnotationDisplay: AnnotationDisplay | undefined = undefined;
    selectedInstruction=0;
    loading=false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadAnnotationDisplays = async (id_article:number) => {
        this.loading = true;
        this.loadingInitial = true;
        this.annotationDisplayRegistry.clear();
        this.annotationDisplayArray.length=0;
        try {
            this.annotationDisplayArray = await agent.AnnotationDisplays.list(id_article);
            this.setIsLoading(false);
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
            this.loading = false;
        }
    }

    setSelectedAnnotationDisplayMap = async (id_instruct:number) => {
        let objects = this.annotationDisplayArray.filter((item:AnnotationDisplay) => item.id_instruct === id_instruct);
        if(objects) {
            this.selectedAnnotationDisplayMap.clear();
            runInAction(()=>{
                objects.forEach(annotationDisplay => {
                    this.setAnnotationDisplay(annotationDisplay);
                })
            })
            
            this.selectedInstruction=id_instruct;
            return objects;
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


    updateAnnotationDisplay = async (objects: AnnotationDisplay[]) => {
        this.loading = true;
        
        try {
            await agent.AnnotationDisplays.update(objects);
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

    private setAnnotationDisplay = (object : AnnotationDisplay) => {
        this.selectedAnnotationDisplayMap.set(object.id_annotation,object);
    }

    private getAnnotationDisplay=(id_annotation:number) => {
        return this.selectedAnnotationDisplayMap.get(id_annotation);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoading = (state: boolean) => {
        this.loading = state;
    }
}