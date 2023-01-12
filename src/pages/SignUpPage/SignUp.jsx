import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SubForm1, SubForm2, SubForm3 } from '../../components/SubForms';
import { AuthContext } from '../../context/AuthContext';
import "./SignUp.scss";

const SignUp = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [avatarPicked, setAvatarPicked] = useState(1);
  const [currentSubForm, setCurrentSubForm] = useState(1);

  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLoggedIn) {
        navigate("/home" );
    }
  }, [isUserLoggedIn, navigate]);

  const nextSubForm = () => {
    if (currentSubForm < 3) {
        setCurrentSubForm(prev => prev + 1);
    }
  };

  const previousSubForm = () => {
        if (currentSubForm > 1) {
            setCurrentSubForm(prev => prev - 1);
        }
  };


  return (
    <div className="page signup-page">
        <div className='container'>
            <div className='left-side'>
                <div className='signup-form-container form-container'>
                    <h3>
                        {currentSubForm === 1 && "Enter user details"}
                        {currentSubForm === 2 && "Create new login"}
                        {currentSubForm === 3 && "Choose an avatar"}
                    </h3>
                    <h4>Fill out the form.</h4>
                    <form className="signup-form" onSubmit={() => console.log("submitting")}>
                        <SubForm1 
                            currentSubForm={currentSubForm}
                            setFirstName={setFirstName}
                            setLastName={setLastName}
                            setEmail={setEmail}
                            firstName={firstName}
                            lastName={lastName}
                            email={email} 
                        />
                        <SubForm2 
                            currentSubForm={currentSubForm} 
                            setUsername={setUsername}
                            setPassword={setPassword}
                            username={username}
                            password={password}
                        />
                        <SubForm3 
                            currentSubForm={currentSubForm}
                            avatarPicked={avatarPicked}
                            setAvatarPicked={setAvatarPicked}
                        />
                        <div className="form-button-container">
                            {currentSubForm > 1 && (
                                <button
                                    className="form-button signup-form-button previous-button"
                                    type="button"
                                    onClick={previousSubForm}
                                >
                                    Previous
                                </button>
                            )}
                            {currentSubForm < 3 && (
                                <button
                                    className="form-button signup-form-button"
                                    type="button"
                                    onClick={nextSubForm}
                                >
                                    Next
                                </button>
                            )}
                            {currentSubForm === 3 && (
                                <button
                                    className="form-button signup-form-button"
                                    type="submit"
                                    disabled={
                                        firstName === "" ||
                                        lastName === "" ||
                                        email === "" ||
                                        username === "" ||
                                        password === ""
                                    }
                                >
                                    Create Account
                                </button>
                            )}
                        </div>
                        <div className='request-login'>
                            <span>Already have an account?</span>
                            <Link className="form-link" to="/login">
                                Login instead
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className='right-side'>
                <img src={require('../../assets/Begin-chat.png')} width={400} height={400} alt="2 people chatting online" />
            </div>
        </div>
    </div>
  )
}

export default SignUp;
