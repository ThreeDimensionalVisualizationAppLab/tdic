import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Attachmentfile } from "../models/attachmentfile";
import {format} from 'date-fns';

export default class AttachmentfileStore {
    AttachmentfileRegistry = new Map<number, Attachmentfile>();
    selectedAttachmentfile: Attachmentfile| undefined = undefined;
//    editMode=false;
    loading=false;
//    loadingInitial = false;
//    AttachmentfileArray:Attachmentfile[]=[];

    constructor(){
        makeAutoObservable(this)
    }


    get AttachmentfilesArray(){
        
        return Array.from(this.AttachmentfileRegistry.values());

            
    }
    get AttachmentfilesByDate(){
        
        return Array.from(this.AttachmentfileRegistry.values()).sort((a,b) => 
            a.create_datetime!.getTime() - b.create_datetime!.getTime());

            
    }

    get groupedAttachmentfiles(){
        return Object.entries(
            this.AttachmentfilesByDate.reduce((attachmentfiles,attachmentfile) => {
                const id = attachmentfile.id_file;
                attachmentfiles[id] = attachmentfiles[id] ? [...attachmentfiles[id], attachmentfile] : [attachmentfile];
                return attachmentfiles;
            }, {} as {[key: number]: Attachmentfile[]})
        )
    }


    loadAttachmentfiles = async () => {
        this.loading = true;
        try {
            const attachmentfiles = await agent.Attachmentfiles.list();
            attachmentfiles.forEach(attachmentfile => {
                this.setAttachmentfile(attachmentfile);
            })
            this.setLoaing(false);
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
    }

    loadAttachmentfile = async (id:number) => {
        this.loading = true;
        let object:Attachmentfile;
        try {
            console.log("called id2");
            object = await agent.Attachmentfiles.details(id);
            this.setAttachmentfile(object);
            runInAction(()=>{
                this.selectedAttachmentfile = object;
            })
            this.setLoaing(false);
//            this.setLoaingInitial(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
        
    }


    private setAttachmentfile = (attachmentfile : Attachmentfile) => {
        this.AttachmentfileRegistry.set(attachmentfile.id_file,attachmentfile);
    }

    private getActivity=(id:number) => {
        return this.AttachmentfileRegistry.get(id);
    }

    /*
    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    */
    
    setLoaing = (state: boolean) => {
        this.loading = state;
    }


}