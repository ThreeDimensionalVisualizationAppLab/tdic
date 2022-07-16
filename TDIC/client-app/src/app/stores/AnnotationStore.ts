import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Annotation } from "../models/Annotation";

export default class AnnotationStore {
    annotationRegistry = new Map<number, Annotation>();
    selectedAnnotation: Annotation| undefined = undefined;
    loading=false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadAnnotations = async (id_article:number) => {
        this.loading = true;
        this.loadingInitial = true;
        this.annotationRegistry.clear();
        try {
            const annotation = await agent.Annotations.list(id_article);
            annotation.forEach(annotation => {
                this.setAnnotation(annotation);
            })
            this.setIsLoading(false);
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
            this.setLoaingInitial(false);
        }
    }

    setSelectedAnnotation = async (id_annotation:number) => {
        let object = this.getAnnotation(id_annotation);
        if(object) {
            //this.selectedAnnotation = object;
            runInAction(()=>{
                this.selectedAnnotation = object;
            })
            return object;
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
    

    
    createAnnotation = async (object: Annotation) => {
        this.loading = true;
        try {
            await agent.Annotations.create(object);
            runInAction(() => {
                this.annotationRegistry.set(object.id_annotation, object);
                this.selectedAnnotation = object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    
    editAnnotationInternal = async (object: Annotation) => {
        
        try {
            runInAction(() => {
                this.annotationRegistry.set(object.id_annotation, object);
                this.selectedAnnotation = object;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
            })
        }
    }
    
    updateAnnotation = async (object: Annotation) => {
        this.loading = true;
        
        try {
            await agent.Annotations.update(object);
            runInAction(() => {
                this.annotationRegistry.set(object.id_annotation, object);
                this.selectedAnnotation = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    
    deleteAnnotation = async (object: Annotation) => {
        this.loading = true;
        
        try {
            await agent.Annotations.delete(object.id_article, object.id_annotation);
            runInAction(() => {
                this.annotationRegistry.delete(object.id_annotation);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    private setAnnotation = (object : Annotation) => {
        this.annotationRegistry.set(object.id_annotation,object);
    }

    private getAnnotation=(id_annotation:number) => {
        return this.annotationRegistry.get(id_annotation);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoading = (state: boolean) => {
        this.loading = state;
    }
}