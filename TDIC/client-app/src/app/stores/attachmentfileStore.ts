import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Attachmentfile } from "../models/attachmentfile";
import {format} from 'date-fns';

export default class AttachmentfileStore {
    AttachmentfileRegistry = new Map<number, Attachmentfile>();
    selectedActivity: Attachmentfile| undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial = false;
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
                //const date = format(attachmentfile.create_datetime!, 'dd MMM yyyy');
                const id = attachmentfile.id_file;// format(attachmentfile.create_datetime!, 'dd MMM yyyy');
                attachmentfiles[id] = attachmentfiles[id] ? [...attachmentfiles[id], attachmentfile] : [attachmentfile];
                return attachmentfiles;
            }, {} as {[key: number]: Attachmentfile[]})
        )
    }


    loadAttachmentfiles = async () => {
        this.loadingInitial = true;
        try {
            const attachmentfiles = await agent.Attachmentfiles.list();
            attachmentfiles.forEach(attachmentfile => {
                this.setAttachmentfile(attachmentfile);
            })
 //           this.AttachmentfileArray=attachmentfiles;
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoaingInitial(false);
        }
    }

    private setAttachmentfile = (attachmentfile : Attachmentfile) => {
        this.AttachmentfileRegistry.set(attachmentfile.id_file,attachmentfile);
    }

    private getActivity=(id:number) => {
        return this.AttachmentfileRegistry.get(id);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


}