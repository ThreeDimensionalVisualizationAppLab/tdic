import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { OptionBase } from "../models/Optionbase";
import { mArticleStatus } from "../models/mArticleStatus";



export default class MArticleStatusStore {
    statusRegistry = new Map<number, mArticleStatus>();
    selectedStatus: mArticleStatus| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;
    isLoadingFinished = false;

    constructor(){
        makeAutoObservable(this)
    }




    loadStatuses = async () => {
        this.loadingInitial = true;
        this.isLoadingFinished = false;
        try {
            const statuses = await agent.MArticleStatus.list();
            statuses.forEach(status => {
                this.setStatus(status);
            })
            this.setLoaingInitial(false);
            this.setIsLoadingFinished(true);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
        }
    }

    loadStatus = async (id:number) => {
        let status = this.getStatus(id);
        if(status) {
            this.selectedStatus = status;
            this.setIsLoadingFinished(true);
            return status;
        } else {
            this.loadingInitial = true;
            this.setIsLoadingFinished(false);
            try {
                status = await agent.MArticleStatus.details(id);
                this.setStatus(status);
                runInAction(()=>{
                    this.selectedStatus = status;
                })
                this.setLoaingInitial(false);
                this.setIsLoadingFinished(true);
                return status;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }
    }

    
    createStatus = async (status: mArticleStatus) => {
        this.loading = true;
        try {
            await agent.MArticleStatus.create(status);
            runInAction(() => {
                this.statusRegistry.set(status.id, status);
                this.selectedStatus = status;
                this.editMode=false;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    updateStatus = async (status: mArticleStatus) => {
        this.loading = true;
        
        try {
            await agent.MArticleStatus.update(status);
            runInAction(() => {
                this.statusRegistry.set(status.id, status);
                this.selectedStatus = status;
                this.editMode=false;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteStatus = async (Id: number) => {
        this.loading = true;
        
        try {
            await agent.MArticleStatus.delete(Id);
            runInAction(() => {
                this.statusRegistry.delete(Id);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private setStatus = (status : mArticleStatus) => {
        this.statusRegistry.set(status.id, status);
    }

    private getStatus=(id:number) => {
        return this.statusRegistry.get(id);
    }

    getOptionArray=()=>{
        const ans = Array<OptionBase>();

        
        Array.from(this.statusRegistry.values()).map(status=>(
            ans.push({label: status.name, value: status.id.toString()})
        ))
        return ans;
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoadingFinished = (state: boolean) => {
        this.isLoadingFinished = state;
    }

}
