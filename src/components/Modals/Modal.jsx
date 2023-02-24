import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/ModalContext';
import AddUserModal from './AddUserModal';
import CreateRoomModal from './CreateRoomModal';
import './Modal.scss';
import ViewImageModal from './ViewImageModal';

const modalRoot = document.getElementById('modal-root');

const Modal = () => {
    const { closeModal, showModal, modalName, modalProps } = useContext(ModalContext);

    const el = document.createElement('div');

    useEffect(() => {
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        }
    }, [el])

    const stopClick = (e) => {
        e.stopPropagation();
    }
    return createPortal(
        <div className={`modal-container ${showModal ? 'opened' : 'closed'}`} onClick={closeModal}>
            <div className="modal-screen" onClick={stopClick}>
                {/* <div className="modal-exit-btn" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </div> */}
                {(modalName === 'CreateRoomModal') && <CreateRoomModal />}
                {(modalName === 'AddUserModal') && <AddUserModal roomInfo={modalProps} />}
                {(modalName === 'ViewImageModal') && <ViewImageModal images={modalProps} />}
            </div>
        </div>
    , el)
}

export default Modal;