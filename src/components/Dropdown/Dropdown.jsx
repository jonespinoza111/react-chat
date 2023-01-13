import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import "./Dropdown.scss";

const Dropdown = () => {
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
        <a {...itemProps[0]}>
          Start Chat
        </a>
        <a {...itemProps[1]} onClick={() => console.log("button open")}>
          Add Friend
        </a>
      </div>
    </div>
  );
};

export default Dropdown;
