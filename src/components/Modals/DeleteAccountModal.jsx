import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { SocketContext } from "../../context/SocketContext";

const DeleteAccountModal = () => {

    const { userInfo, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);

    const deleteAccount = async () => {
        if (userInfo) {
            try {
                const response = await fetch(
                  `http://localhost:5000/users/${userInfo.uid}`,
                  {
                    method: "DELETE"
                  }
                );

                logout(navigate, socket);
          
        
              } catch (err) {
                console.log("There was an error updating the user", err);
              }
        }
    }

  const { closeModal } = useContext(ModalContext);
  return (
    <div className="delete-account-modal">
      <div className="title-row">
        <h3>Delete Account</h3>
      </div>
      <h4 className="prompt">Are you sure you want to delete your account?</h4>
      <div className="row delete-button-row">
        <button className="delete-button" onClick={deleteAccount}>
          Delete
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
