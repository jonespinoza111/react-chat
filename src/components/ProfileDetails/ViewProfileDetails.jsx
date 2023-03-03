import React from "react";

const ViewProfileDetails = ({ profileDetails }) => {
    const date = new Date(profileDetails.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
     return (
        <div className="view-profile-details">
        <div className="info-row">
            <img
            className="user-avatar"
            src={require(`../../assets/${
                profileDetails.profilePic || "option-1-futuristic-car.jpg"
            }`)}
            alt="user-avatar"
            />
        </div>
        <div className="info-row">
            <h2>Username:</h2>
            <h3>{profileDetails.username}</h3>
        </div>
        <div className="info-row">
            <h2>Member Since:</h2>
            <h3>{date}</h3>
        </div>
        <div className="info-row">
            <h2>Name:</h2>
            <h3>
            {profileDetails.firstName} {profileDetails.lastName}
            </h3>
        </div>
        <div className="info-row">
            <h2>Email:</h2>
            <h3>{profileDetails.email}</h3>
        </div>
        </div>
    );
};

export default ViewProfileDetails;
