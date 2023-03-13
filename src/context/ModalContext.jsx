import React, { useState, createContext } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [modalProps, setModalProps] = useState(null);

  const openModal = (name, props) => {
    setModalName(name);
    setModalProps(props);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalName(null);
    const body = document.body;
    body.classList.remove("modal-open");
  };
  return (
    <ModalContext.Provider
      value={{ showModal, modalName, modalProps, closeModal, openModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
