import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import SingleUser from "../SingleUser/SingleUser";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./ChatSidebar.scss";

const ChatSidebar = () => {
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  const { socket } = useContext(SocketContext);
  const { userInfo, userFriends, getUserFriends } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo) {
      socket.emit("getOnlineUsers", userInfo.uid, (users) => {
        setOnlineUsers(users);
      });
      socket.emit("getAllUsers", (users) => {
        setAllUsers(users);
        console.log('This is what all the usuers are doing here ', users);
      });
      socket.on("getUserFriends", () => {
        console.log('getting tutto friends in chatSidebar ');
        getUserFriends(socket);
      })
      getUserFriends(socket)
    }
  }, [userInfo, socket, getUserFriends]);

  return (
    <div className="chat-sidebar">
      <div className="sidebar-container">
        {userInfo && <SingleUser user={userInfo} />}
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
          {onlineUsers && onlineUsers.map((el) => (
            <div key={el} className="online-user">
              <UserAvatar src={userInfo && userInfo.profilePic} />
              <h4>{userInfo && userInfo.username}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="rooms-container sidebar-container">
        <h3 className="row-title">Friends</h3>
        <div className="all-rooms">
          {userFriends &&
            userFriends.length &&
            userFriends
              // .filter((user) => user.status === "accepted")
              .map((user) => (
                <SingleUser
                  key={user._id}
                  user={user.friend}
                  hover={true}
                  friendStatus={user.status}
                  getFriends={getUserFriends}
                />
              ))}
        </div>
      </div>

      <div className="rooms-container sidebar-container">
        <h3 className="row-title">Rooms</h3>
        <div className="all-rooms">
          {allUsers &&
            allUsers
            .filter((user) => user._id !== userInfo.uid)
            .sort((a, b) => {
              if (a.username < b.username) {
                  return -1;
              }
              if (a.username > b.username) {
                  return 1;
              }
              return 0;
            })
            .map((user, index) => {
              let friendStatus =
                userFriends &&
                userFriends.find(
                    ({ friend }) => friend._id === user._id
                );
              friendStatus = friendStatus ? friendStatus : 'none';
              return (
                <SingleUser key={index} user={user} hover={true} friendStatus={friendStatus.status} getFriends={getUserFriends} />
              )
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
