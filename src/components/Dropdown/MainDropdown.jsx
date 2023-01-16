import React from 'react';
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import "./Dropdown.scss";

const MainDropdown = () => {
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
            Profile
            </a>
            <a {...itemProps[1]} onClick={() => console.log('Deleting Account')}>
            Delete Account
            </a>
        </div>
    </div>
  );
}

export default MainDropdown;
