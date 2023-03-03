import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import "./Navbar.scss";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  return (
    <nav className="navigationWrapper">
      <div className="logoWrapper">
        <span className="stylish">ChatWith</span>
        <span className="logo">Us</span>
      </div>
      <ul className="navigation">
          <li className="parent">
            <Link className="link" to={"/home"}>
              Home
            </Link>
          </li>
        <li className="parent" onClick={() => logout(navigate, socket)}>
          <a className="link" href="#">
            Logout
          </a>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
