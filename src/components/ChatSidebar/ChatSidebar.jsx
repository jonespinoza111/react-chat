import React from "react";
import { Link } from "react-router-dom";
import "./ChatSidebar.scss";

const ChatSidebar = ({ userInfo }) => {
  return (
    <div className="chat-sidebar">
      <div className="user-info-container">
        <Link to="/home" className="avatar-link">
          <img
            width="64"
            height="64"
            className="user-avatar"
            src={require(`../../assets/${
              userInfo.profilePic || "option-1-futuristic-car.jpg"
            }`)}
            alt="user-avatar"
          />
        </Link>
        <div className="user-info">
          <h3>{userInfo.username}</h3>
          <h4>My Account</h4>
        </div>
        <div className="options-button">&#xFE19;</div>
      </div>

      <div className="search-container">
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search or start a new chat..."
          />
        </div>
      </div>

      <div className="online-container sidebar-container">
        <h3>Online Now</h3>
        <div className="online-users">
          {[0,1,2,3,4,5,6,7].map((el) => (
            <div className="online-user">
                <Link to="/home" key={el} className="avatar-link">
                  <img
                    width="64"
                    height="64"
                    className="user-avatar"
                    src={require(`../../assets/${
                      userInfo.profilePic || "option-1-futuristic-car.jpg"
                    }`)}
                    alt="user-avatar"
                  />
                </Link>
              <h4>{userInfo.username}</h4>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rooms-container sidebar-container">
        <h3>Friends</h3>
        <div className="all-rooms">
        {[0,1,2,3,4,5,6,7].map((el) => (
          <div className="user-info-container single-user">
            <Link to="/home" className="avatar-link">
              <img
                width="64"
                height="64"
                className="user-avatar"
                src={require(`../../assets/${
                  userInfo.profilePic || "option-1-futuristic-car.jpg"
                }`)}
                alt="user-avatar"
              />
            </Link>
            <div className="user-info">
              <h3>{userInfo.username}</h3>
              <h4>My Account</h4>
            </div>
            <div className="options-button">&#xFE19;</div>
          </div>
        ))}
        </div>        
      </div>

      <div className="rooms-container sidebar-container">
        <h3>Rooms</h3>
        <div className="all-rooms">
          {[0,1,2,3,4,5,6,7].map((el) => (
            <div className="user-info-container single-user">
              <Link to="/home" className="avatar-link">
                <img
                  width="64"
                  height="64"
                  className="user-avatar"
                  src={require(`../../assets/${
                    userInfo.profilePic || "option-1-futuristic-car.jpg"
                  }`)}
                  alt="user-avatar"
                />
              </Link>
              <div className="user-info">
                <h3>{userInfo.username}</h3>
                <h4>How are you doing mate!</h4>
              </div>
              <div className="options-button">&#xFE19;</div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ChatSidebar;
