import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { View } from "../models/view";

export default class ViewStore {
    viewRegistry = new Map<number, View>();
    selectedView: View| undefined = undefined;
    loading=false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }


    loadViews = async (id_article:number) => {
        this.loading = true;
        this.loadingInitial = true;
        this.viewRegistry.clear();
        this.selectedView = undefined;
        try {
            const views = await agent.Views.list(id_article);
            views.forEach(view => {
                this.setView(view);
            })
            this.setLoaingInitial(false);
            this.setIsLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
            this.loading = false;
        }
    }

    setselectedView = async (id_view:number) => {
        let view = this.getView(id_view);
        if(view) {
            this.selectedView = view;
            runInAction(()=>{
                this.selectedView = view;
            })
            return view;
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
    
    
    createView = async (object: View) => {
        this.loading = true;
        try {
            await agent.Views.create(object);
            runInAction(() => {
                this.viewRegistry.set(object.id_view, object);
                this.selectedView = object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateView = async (object: View) => {
        this.loading = true;
        
        try {
            await agent.Views.update(object);
            runInAction(() => {
                this.viewRegistry.set(object.id_view, object);
                this.selectedView = object;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    

    
    deleteView = async (object: View) => {
        this.loading = true;
        
        try {
            await agent.Views.delete(object.id_article, object.id_view);
            runInAction(() => {
                this.viewRegistry.delete(object.id_view);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    private setView = (object : View) => {
        this.viewRegistry.set(object.id_view,object);
    }

    private getView=(id_view:number) => {
        return this.viewRegistry.get(id_view);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoading = (state: boolean) => {
        this.loading = state;
    }
}