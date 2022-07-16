import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import { useStore } from "../../stores/store";


export default observer( function ModalContainer() {
    const {modalStore} = useStore();

    return (
        <Modal show = {modalStore.modal.open} onClose = {modalStore.closeModal} >
            <Modal.Body>
                {modalStore.modal.body}
            </Modal.Body>
        </Modal>
    )
})