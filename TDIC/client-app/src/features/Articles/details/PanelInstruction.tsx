import { Instruction } from "../../../app/models/instruction";
import { marked } from 'marked';

interface Props{
    instruction: Instruction;
}

export default function PanelInstruction({instruction}: Props){

    return (
        <>
        <div>
            <div dangerouslySetInnerHTML={{__html: marked(instruction.short_description)}}></div>  
        </div>
        </>

    )
}