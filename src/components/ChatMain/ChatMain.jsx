import React from "react";
import SingleMessage from "../SingleMessage/SingleMessage";
import SingleUser from "../SingleUser/SingleUser";
import "./ChatMain.scss";

const ChatMain = ({ userInfo }) => {
  return (
    <div className="chat-main">
        <div className="main-container">
            <SingleUser userInfo={userInfo} />
        </div>
      {/* <div className="user-info-container">
          <img
            width="64"
            height="64"
            className="user-avatar"
            src={require(`../../assets/${
              userInfo && userInfo.profilePic || "option-1-futuristic-car.jpg"
            }`)}
            alt="user-avatar"
          />
        <div className="user-info">
          <h3>Michael</h3>
          <h4>Typing...</h4>
        </div>
        <div className="options-button">&#xFE19;</div>
      </div> */}
      <div className="chat-area">
        <SingleMessage 
            data={{ username: 'Jonathan', timestamp: '11:30pm'}}
            message="I am doing great today! I want to go out to eat someday. How about we get some lunch at this new restaurant I have been wanting to go to. I'm free on Friday if your avaiable?"
            direction="right"
            newMessenger={false}
        />
        <SingleMessage 
            data={{ username: 'Jacob', timestamp: '1:25pm'}}
            message="I am doing great today! I want to go out to eat someday."
            newMessenger={true}
        />
        <SingleMessage 
            data={{ username: 'Jonathan', timestamp: '11:30pm'}}
            message="I am doing great today! I want to go out to eat someday. How about we get some lunch at this new restaurant I have been wanting to go to. I'm free on Friday if your avaiable?"
            // direction="left"
            newMessenger={true}
        />
        <SingleMessage 
            data={{ username: 'Jonathan', timestamp: '11:30pm'}}
            message="I am doing great today! I want to go out to eat someday. How about we get some lunch at this new restaurant I have been wanting to go to. I'm free on Friday if your avaiable?"
            // direction="left"
            newMessenger={false}
        />
        <SingleMessage 
            data={{ username: 'Jonathan', timestamp: '11:30pm'}}
            message="I am doing great today! I want to go out to eat someday. How about we get some lunch at this new restaurant I have been wanting to go to. I'm free on Friday if your avaiable?"
            // direction="left"
            newMessenger={false}
        />
      </div>
      <div className="enter-message-container">
        <input type="text" placeholder="Type a message ..." />
      </div>
    </div>
  );
};

export default ChatMain;
