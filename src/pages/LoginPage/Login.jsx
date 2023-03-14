import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isUserLoggedIn, checkAuthUser } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/home");
    }
  }, [isUserLoggedIn, navigate]);

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://chat-server-wc7r.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData: {
            username,
            password,
          },
        }),
      });
      const body = await response.json();

      if (body.success) {
        localStorage.setItem("currentUser", body.authorization);
        checkAuthUser();
        navigate("/home");
        navigate(0);
      }
    } catch (err) {
      console.log("There was an error loggin in", err);
    }
  };

  return (
    <div className="page login-page">
      <div className="container">
        <div className="left-side">
          <div className="login-form-container form-container">
            <h3>Welcome back</h3>
            <h4>Welcome back! Please enter your details.</h4>
            <form className="login-form" onSubmit={submitLogin}>
              <div className="form-input-container">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  className="form-input input"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="firstname">Password</label>
                <input
                  id="password"
                  className="form-input input"
                  placeholder=""
                  type={showPassword ? '' : 'password'}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-input-container show-password-container">
                <input className="show-password" type="checkbox" onChange={(e) => setShowPassword(prev => !prev)} />
                <span>Show Password</span>
              </div>
              <div className="form-button-container">
                <button className="form-button login-form-button" type="submit">
                  Sign In
                </button>
              </div>
              <div className="request-sign-up">
                <span>Don't have an account?</span>
                <Link className="form-link" to="/signup">
                  Sign up instead
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="right-side">
          <div className="image-container">
            <img
              src={require("../../assets/Begin-chat.png")}
              width={400}
              height={400}
              alt="2 people chatting online"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
