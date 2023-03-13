import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { SocketContext } from "../../context/SocketContext";
import SearchBar from "../SearchBar/SearchBar";
import SingleRoom from "../SingleRoom/SingleRoom";
import SingleUser from "../SingleUser/SingleUser";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./ChatSidebar.scss";

const ChatSidebar = () => {
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  const { socket } = useContext(SocketContext);
  const { userInfo, userFriends, userRooms, getUserFriends, getUserRooms } =
    useContext(AuthContext);
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    if (userInfo) {
      socket.emit("getOnlineUsers", userInfo.uid, (users) => {
        setOnlineUsers(users);
      });
      socket.emit("getAllUsers", (users) => {
        setAllUsers(users);
        console.log("This is what all the usuers are doing here ", users);
      });
      socket.on("getUserFriends", () => {
        console.log("getting tutto friends in chatSidebar ");
        getUserFriends(socket);
      });
      getUserFriends(socket);
      getUserRooms(socket);

      return () => {
        socket.off("getUserFriends");
      };
    }
  }, [userInfo, socket, getUserFriends, getUserRooms]);

  return (
    <div className="chat-sidebar">
      <div className="sidebar-container">
        {userInfo && <SingleUser user={userInfo} />}
      </div>

      <div className="search-container">
        <SearchBar />
      </div>

      {/* <div className="online-container sidebar-container">
        <h3 className="row-title">Online Now</h3>
        <div className="online-users">
          {onlineUsers &&
            onlineUsers.map((el) => (
              <div key={el} className="online-user">
                <UserAvatar src={userInfo && userInfo.profilePic} />
                <h4>{userInfo && userInfo.username}</h4>
              </div>
            ))}
        </div>
      </div> */}

      <div className="rooms-container sidebar-container">
        <h3 className="row-title">Friends</h3>
        <div className="all-rooms">
          {userFriends &&
            userFriends.length > 0 &&
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
          {userInfo && userFriends.length <= 0 && (
            <h4>No friends added yet.</h4>
          )} 
        </div>
      </div>

      <div className="rooms-container sidebar-container">
        <h3 className="row-title">DMs</h3>
        <div className="all-rooms">
          {userInfo &&
            userRooms &&
            userRooms
              .filter((room) => !room.roomName)
              .filter((room) => room.userIds.length > 1)
              .map((room) => (
                <SingleRoom
                  key={room._id}
                  room={room}
                  userInfo={userInfo}
                  hover={true}
                />
              ))}
          {userInfo && userFriends.length <= 0 && (
            <h4>No DM's started yet.</h4>
          )}  
        </div>
      </div>

      <div className="rooms-container sidebar-container">
        <div className="row-container">
          <h3 className="row-title">Rooms</h3>
          <button
            className="add-room-button"
            onClick={() => openModal("CreateRoomModal")}
          >
            Create Room
          </button>
        </div>
        <div className="all-rooms">
          {userInfo &&
            userRooms &&
            userRooms
              .filter((room) => room.roomName)
              // .filter((room) => room.userIds.length > 1)
              .map((room) => (
                <SingleRoom
                  key={room._id}
                  room={room}
                  userInfo={userInfo}
                  hover={true}
                />
              ))}
          {userInfo && userRooms.length <= 0 && (
            <h4>No rooms created yet.</h4>
          )}     
        </div>
      </div>

      <div className="rooms-container sidebar-container">
        <h3 className="row-title">All Users</h3>
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
                  userFriends.find(({ friend }) => friend._id === user._id);
                friendStatus = friendStatus ? friendStatus : "none";
                return (
                  <SingleUser
                    key={index}
                    user={user}
                    hover={true}
                    friendStatus={friendStatus.status}
                    getFriends={getUserFriends}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
