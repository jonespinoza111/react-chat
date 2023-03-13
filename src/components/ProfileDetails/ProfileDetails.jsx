import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { avatarOptions } from "../../data/avatarOptions.js";

const ProfileDetails = ({ userInfo }) => {
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [email, setEmail] = useState(userInfo.email);
  const { checkAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [avatarPicked, setAvatarPicked] = useState(
    avatarOptions.find((option) => option.src === userInfo.profilePic).optionNum
  );

  const submitChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userInfo.uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userUpdates: {
              profilePic: avatarOptions[avatarPicked - 1].src,
              firstName,
              lastName,
              email,
            },
          }),
        }
      );

      const body = await response.json();

      if (body.success) {
        localStorage.setItem("currentUser", body.authToken);
        checkAuthUser();
        navigate(0);
      }
    } catch (err) {
      console.log("There was an error updating the user", err);
    }
  };

  return (
    <form
      className="profile-details-form form-container"
      onSubmit={submitChanges}
    >
      <div className="form-group">
        <h3 className="form-sub-title">Change your avatar</h3>
        <div className="options-container">
          {avatarOptions.map(({ optionNum, src, alt }) => {
            return (
              <img
                key={optionNum}
                className={`avatar-option ${
                  avatarPicked === optionNum && "current-choice"
                }`}
                src={require(`../../assets/${src}`)}
                alt={alt}
                onClick={() => setAvatarPicked(optionNum)}
              />
            );
          })}
        </div>
      </div>
      <div className="form-group">
        <div className="form-input-container details-input-container">
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            className="form-input"
            value={firstName}
            type="text"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-input-container details-input-container">
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            className="form-input"
            defaultValue={lastName}
            type="text"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-input-container details-input-container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-input"
            defaultValue={email}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <button
        className="form-button profile-details-form-button"
        type="submit"
        disabled={
          userInfo.firstName !== firstName ||
          userInfo.lastName !== lastName ||
          userInfo.email !== email ||
          userInfo.profilePic !== avatarOptions[avatarPicked - 1].src
            ? false
            : true
        }
      >
        Submit
      </button>
    </form>
  );
};

export default ProfileDetails;
