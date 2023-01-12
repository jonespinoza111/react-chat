import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  return (
    <div className='page login-page'>
      <div className='container'>
        <div className='left-side'>
          <div className='login-form-container form-container'>
            <h3>Welcome back</h3>
            <h4>Welcome back! Please enter your details.</h4>
            <form className="login-form">
                <div className="form-input-container">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className="form-input input"
                        placeholder="Enter your email"
                        type="text"
                        required                     
                    />
                </div>
                <div className="form-input-container">
                    <label htmlFor="firstname">Password</label>
                    <input
                        id="password"
                        className="form-input input"
                        placeholder=""
                        type="text"
                        required
                    />
                </div>
                <div className="form-button-container">
                    <button className="form-button login-form-button" type="submit">
                      Sign In
                    </button>
                </div>
                <div className='request-sign-up'>
                  <span>Don't have an account?</span>
                  <Link className="form-link" to="/signup">
                    Sign up instead
                  </Link>
                </div>
            </form>
          </div>
        </div>
        <div className='right-side'>
          <div className='image-container'>
            <img src={require('../../assets/Begin-chat.png')} width={400} height={400} alt="2 people chatting online" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
