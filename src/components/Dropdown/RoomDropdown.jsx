import React from 'react';
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import "./Dropdown.scss";


const RoomDropdown = () => {
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
            <a {...itemProps[0]} onClick={() => console.log('Going to profile page')}>
            Add Friend to Room
            </a>
            <a {...itemProps[1]} onClick={() => console.log('Deleting Account')}>
            Leave Room
            </a>
            <a {...itemProps[2]} onClick={() => console.log('Deleting Account')}>
            Delete Room
            </a>
        </div>
    </div>
  )
}

export default RoomDropdown;
