import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import "./Dropdown.scss";

const Dropdown = ({ startChat, addFriend, removeFriend, friendStatus }) => {
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
        <a {...itemProps[0]} onClick={startChat}>
          Start Chat
        </a>
        {friendStatus === "requested" && (
            <a {...itemProps[1]} onClick={() => {
              setIsOpen((prev) => !prev);
              removeFriend();
            }}>
              Remove Friend Request
            </a>
        )}
        {friendStatus === "pending" && (
            <a {...itemProps[1]} onClick={() => {
              setIsOpen((prev) => !prev);
              addFriend();
            }}>
              Accept Friend Request
            </a>
        )}
        {friendStatus === "accepted" && (
          <a {...itemProps[1]} onClick={() => {
              setIsOpen((prev) => !prev);
              removeFriend();
            }}>
            Remove Friend
          </a>
        )}
        {friendStatus === "none" && (
          <a {...itemProps[1]} onClick={() => {
              addFriend();
              setIsOpen((prev) => !prev);
          }}>
            Add Friend
          </a>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
