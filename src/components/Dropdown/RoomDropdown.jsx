import React from 'react';
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import "./Dropdown.scss";


const RoomDropdown = ({ enterRoom, deleteRoom }) => {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
  return (
    <div className="dropdown-button">
        <button className="options-button" {...buttonProps} onClick={() => setIsOpen((prev) => !prev)}>
            &#xFE19;
        </button>
        <div
            className={`dropdown-container ${isOpen ? "visible" : ""}`}
            role="menu"
        >
            <a {...itemProps[0]} onClick={() => {
                setIsOpen((prev) => !prev);
                enterRoom();
            }}>
            Add User
            </a>
            <a {...itemProps[1]} onClick={() => {
                setIsOpen((prev) => !prev);
                deleteRoom();
            }}>
            Delete Room
            </a>
        </div>
    </div>
  )
}

export default RoomDropdown;
