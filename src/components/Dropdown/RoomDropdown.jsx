import React, { useContext } from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import { ModalContext } from "../../context/ModalContext";
import "./Dropdown.scss";

const RoomDropdown = ({ deleteRoom, roomInfo, isInitiator }) => {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
  const { openModal } = useContext(ModalContext);
  return (
    <div className="dropdown-button">
      <button
        className="options-button"
        {...buttonProps}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        &#xFE19;
      </button>
      <div
        className={`dropdown-container ${isOpen ? "visible" : ""}`}
        role="menu"
      >
        <a
          {...itemProps[0]}
          onClick={() => {
            setIsOpen((prev) => !prev);
            openModal("AddUserModal", roomInfo);
          }}
        >
          Add User
        </a>
        {isInitiator && (
          <a
            {...itemProps[1]}
            onClick={() => {
              setIsOpen((prev) => !prev);
              deleteRoom();
            }}
          >
            Delete Room
          </a>
        )}
      </div>
    </div>
  );
};

export default RoomDropdown;
