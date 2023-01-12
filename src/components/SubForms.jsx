import React from 'react'
import { avatarOptions } from '../data/avatarOptions';

export const SubForm1 = ({
    currentSubForm,
    setFirstName,
    setLastName,
    setEmail,
    firstName,
    lastName,
    email
}) => {
    console.log("this is the currentSubForm", currentSubForm);
    if (currentSubForm !== 1) {
        return null;
    }
    return (
        <>
            <div className="form-input-container">
                <label htmlFor="firstname">First Name</label>
                <input
                    id="firstname"
                    className="form-input input"
                    value={firstName}
                    type="text"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-input-container">
                <label htmlFor="lastname">Last Name</label>
                <input
                    id="lastname"
                    className="form-input input"
                    value={lastName}
                    type="text"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="form-input-container">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    className="form-input input"
                    value={email}
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </>
    );
};


export const SubForm2 = ({ currentSubForm, setUsername, setPassword, username, password }) => {
    if (currentSubForm !== 2) {
        return null;
    }
    return (
        <>
            <div className="form-input-container">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    className="form-input"
                    value={username}
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-input-container">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    className="form-input"
                    value={password}
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </>
    );
};


export const SubForm3 = ({ currentSubForm, avatarPicked, setAvatarPicked }) => {
    if (currentSubForm !== 3) {
        return null;
    }
    return (
        <div className="options-container">
            {avatarOptions.map(({ optionNum, src, alt }) => {
                return (
                    <img
                        key={optionNum}
                        className={`avatar-option ${(avatarPicked === optionNum) && 'current-choice'}`}
                        src={require(`../assets/${src}`)}
                        alt={alt}
                        onClick={() => setAvatarPicked(optionNum)}
                    />
                );
            })}
        </div>
    );
};