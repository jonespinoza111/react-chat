import React, { useContext } from 'react';
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./Dropdown.scss";

const MainDropdown = () => {
  const { userInfo } = useContext(AuthContext);
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
          {userInfo && (
            <Link className='profile-link' to={`/user/${userInfo.uid}`} {...itemProps[0]}>
              Profile
            </Link>
          )}
            <a {...itemProps[1]} onClick={() => console.log('Deleting Account')}>
            Delete Account
            </a>
        </div>
    </div>
  );
}

export default MainDropdown;
