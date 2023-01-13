import React from "react";
import SingleUser from "../SingleUser/SingleUser";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./ChatSidebar.scss";

const ChatSidebar = ({ userInfo }) => {
  return (
    <div className="chat-sidebar">
      <div className="sidebar-container">
        <SingleUser userInfo={userInfo} />
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
        <h3 className="row-title">Online Now</h3>
        <div className="online-users">
          {[0,1,2,3,4,5,6,7].map((el) => (
            <div key={el} className="online-user">
              <UserAvatar src={userInfo.profilePic} />
              <h4>{userInfo.username}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="rooms-container sidebar-container">
        <h3 className="row-title">Friends</h3>
        <div className="all-rooms">
        {[0,1,2,3,4,5,6,7].map((el) => (
          <SingleUser userInfo={userInfo} hover={true} />
        ))}
        </div>        
      </div>

      <div className="rooms-container sidebar-container">
        <h3 className="row-title">Rooms</h3>
        <div className="all-rooms">
          {[0,1,2,3,4,5,6,7].map((el) => (
            <SingleUser userInfo={userInfo} hover={true} />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ChatSidebar;
