import React from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";

const MemberDropdown = ({ members }) => {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(
    members.length
  );
  return (
    <div className="show-members-button">
      <button
        className="members-button"
        {...buttonProps}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        &#x2304;
      </button>
      <div
        className={`dropdown-container members-dropdown ${
          isOpen ? "visible" : ""
        }`}
        role="menu"
      >
        {members.map((member, index) => (
          <a key={index} {...itemProps[index]} onClick={() => {}}>
            {member.username}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MemberDropdown;
