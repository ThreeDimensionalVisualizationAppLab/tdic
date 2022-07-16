import { createContext, useContext } from "react";
import AnnotationDisplayStore from "./AnnotationDisplayStore";
import AnnotationStore from "./AnnotationStore";
import ArticleStore from "./articleStore";
import AttachmentfileStore from "./attachmentfileStore";
import CommonStore from "./eommonStore";
import InstancepartStore from "./InstancepartStore";
import InstructionStore from "./instructionStore";
import LightStore from "./LightStore";
import MArticleStatusStore from "./MArticleStatusStore";
import ModalStore from "./modalStore";
import ModelfileStore from "./ModelfileStore";
import SceneInfoStore from "./SceneInfoStore";
import UserStore from "./userStore";
import ViewStore from "./viewStore";

interface Store{
    modelfileStore:ModelfileStore;
    articleStore: ArticleStore;
    instructionStore:InstructionStore;
    attachmentfileStore: AttachmentfileStore;
    viewStore:ViewStore;
    annotationStore:AnnotationStore;
    annotationDisplayStore:AnnotationDisplayStore;
    lightStore:LightStore;
    instancepartStore:InstancepartStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    mArticleStatusStore:MArticleStatusStore;
    sceneInfoStore:SceneInfoStore;
}

export const store: Store={
    articleStore: new ArticleStore(),
    modelfileStore: new ModelfileStore(),
    instructionStore: new InstructionStore(),
    attachmentfileStore: new AttachmentfileStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    viewStore: new ViewStore(),
    annotationStore: new AnnotationStore(),
    annotationDisplayStore: new AnnotationDisplayStore(),
    lightStore: new LightStore(),
    instancepartStore: new InstancepartStore(),
    mArticleStatusStore: new MArticleStatusStore(),
    sceneInfoStore: new SceneInfoStore(),
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}