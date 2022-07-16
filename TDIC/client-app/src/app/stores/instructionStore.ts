import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {format} from 'date-fns';
import { Instruction } from "../models/instruction";

export default class InstructionStore {
    instructionRegistry = new Map<number, Instruction>();
    selectedInstruction: Instruction| undefined = undefined;
//    editMode=false;
    loading=false;
    loadingInitial = false;
//    isLoadingFinished=false;

    constructor(){
        makeAutoObservable(this)
    }


    loadInstructions = async (id_article:number) => {
        this.loading = true;
        this.loadingInitial = true;
        this.instructionRegistry.clear();
        try {
            const instructions = await agent.Instructions.list(id_article);
            instructions.forEach(instruction => {
                this.setInstruction(instruction);
            })

            

            // Setup Selected Instruction
            if (this.instructionRegistry.size > 0) {
                const ar1_map
                    = (Array.from(this.instructionRegistry.values()).filter((x: Instruction) => typeof x.display_order === 'number'))
                        .map((x: Instruction) => x.display_order);

                const id_startinst = (Array.from(this.instructionRegistry.values())).filter((x: Instruction) => x.display_order == Math.min.apply(null, ar1_map))[0].id_instruct;
                this.setSelectedInstruction(id_startinst);

            }

            this.setIsLoading(false);
            this.setLoaingInitial(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
            this.setLoaingInitial(false);
        }
    }

    setSelectedInstruction = async (id_instruct:number) => {
        let instruction = this.getInstruction(id_instruct);
        if(instruction) {
            this.selectedInstruction = instruction;
            runInAction(()=>{
                this.selectedInstruction = instruction;
            })
            return instruction;
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

    loadInstruction = async (id_article:number,id_instruct:number) => {
        let instruction = this.getInstruction(id_instruct);
        if(instruction) {
            this.selectedInstruction = instruction;
            return instruction;
        } else {
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
        }
    }
    

    
    createInstruction = async (object: Instruction) => {
        this.loading = true;
        try {
            await agent.Instructions.create(object);
            runInAction(() => {
                this.instructionRegistry.set(object.id_instruct, object);
                this.selectedInstruction = object;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateInstruction = async (instruction: Instruction) => {
        this.loading = true;
        
        try {
            await agent.Instructions.update(instruction);
            runInAction(() => {
                this.instructionRegistry.set(instruction.id_instruct, instruction);
                this.selectedInstruction = instruction;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    
    deleteInstruction = async (instruction: Instruction) => {
        this.loading = true;
        
        try {
            await agent.Instructions.delete(instruction.id_article, instruction.id_instruct);
            runInAction(() => {
                this.instructionRegistry.delete(instruction.id_instruct);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    private setInstruction = (instruction : Instruction) => {
        this.instructionRegistry.set(instruction.id_instruct,instruction);
    }

    private getInstruction=(id_instruct:number) => {
        return this.instructionRegistry.get(id_instruct);
    }

    setLoaingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setIsLoading = (state: boolean) => {
        this.loading = state;
    }

}