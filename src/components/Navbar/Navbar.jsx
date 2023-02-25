import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
          <a className="link" href="/home">
            Home
          </a>
        </li>
        <li className="parent" onClick={() => logout(navigate, socket)}>
          <a className="link" href="#">
            Logout
          </a>
        </li>
        {/* <li class="parent" id="clients">
                    <a class="link" href="#"><i class="fas fa-minus"></i> Clients <i class="fas fa-plus"></i></a>
                    <ul class="subnavigation">
                        <li><a class="link" href="#">Burger King</a></li>
                        <li><a class="link" href="#">Southwest Airlines</a></li>
                        <li><a class="link" href="#">Levi Strauss</a></li>
                    </ul>
                </li>
                <li class="parent" id="services">
                    <a class="link" href="#"><i class="fas fa-minus"></i> Services <i class="fas fa-plus"></i></a>
                    <ul class="subnavigation">
                        <li><a class="link" href="#">Print Design</a></li>
                        <li><a class="link" href="#">Web Design</a></li>
                        <li><a class="link" href="#">Mobile App Development</a></li>
                    </ul>
                </li>
                <li class="parent"><a class="link" href="#">Contact</a></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
