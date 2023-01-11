import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div className='page login-page'>
      <div className='container'>
        <div className='left-side'>
          <div className='login-form-container'>
            <h3>Welcome Back</h3>
            <h4>Welcome back! Please enter your details.</h4>
            <form className="login-form">
                <h1 className="form-title">Login</h1>
                <div className="form-input-container">
                    <label htmlFor="username">*Username</label>
                    <input
                        id="username"
                        className="form-input input"
                        placeholder=""
                        type="text"
                        required                     
                    />
                </div>
                <div className="form-input-container">
                    <label htmlFor="firstname">*Password</label>
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
                        Login
                    </button>
                </div>
            </form>
          </div>
        </div>
        <div className='right-side'>Side 2</div>
      </div>
    </div>
  )
}

export default Login;
