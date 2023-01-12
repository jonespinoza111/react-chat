import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SubForm1, SubForm2, SubForm3 } from '../../components/SubForms';
import "./SignUp.scss";

const SignUp = () => {
  const [currentSubForm, setCurrentSubForm] = useState(3); 
  return (
    <div className="page signup-page">
        <div className='container'>
            <div className='left-side'>
                <div className='signup-form-container form-container'>
                    <h3>
                        {currentSubForm === 1 && "Enter user details"}
                        {currentSubForm === 2 && "Enter login details"}
                        {currentSubForm === 3 && "Choose an avatar"}
                    </h3>
                    <h4>Fill out the form.</h4>
                    <form className="signup-form" onSubmit={() => console.log("hello")}>
                        <SubForm1 currentSubForm={currentSubForm} />
                        <SubForm2 currentSubForm={currentSubForm} />
                        <SubForm3 currentSubForm={currentSubForm} />
                        <div className="form-button-container">
                            {currentSubForm > 1 && (
                                <button
                                    className="form-button signup-form-button previous-button"
                                    type="button"
                                    // onClick={previousSubForm}
                                >
                                    Previous
                                </button>
                            )}
                            {currentSubForm < 3 && (
                                <button
                                    className="form-button signup-form-button"
                                    type="button"
                                    // onClick={nextSubForm}
                                >
                                    Next
                                </button>
                            )}
                            {currentSubForm === 3 && (
                                <button
                                    className="form-button signup-form-button"
                                    type="submit"
                                    // disabled={
                                    //     firstName === "" ||
                                    //     lastName === "" ||
                                    //     email === "" ||
                                    //     username === "" ||
                                    //     password === ""
                                    // }
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
