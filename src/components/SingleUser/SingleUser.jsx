import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import Dropdown from "../Dropdown/Dropdown";
import MainDropdown from "../Dropdown/MainDropdown";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./SingleUser.scss";

const SingleUser = ({
  user,
  hover = false,
  friendStatus = "none",
  getFriends,
}) => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { userInfo } = useContext(AuthContext);
  const [status, setStatus] = useState(null);

  console.log("big big big user info  ", user);

  let userId = user.uid ? user.uid : user._id;

  useEffect(() => {
    socket.emit("checkUserStatus", userId, (userStatus) => {
      setStatus(userStatus);
    });

    socket.on("updateUserStatus", (uid, userStatus) => {
      if (uid === user._id) {
        setStatus(userStatus);
      }
    });

    return () => {
      socket.off("updateUserStatus");
    };
  }, [socket, setStatus, user._id, userId]);

  useEffect(() => {}, [status]);

  const startChat = () => {
    const userIds = [user._id, userInfo.uid];
    socket.emit("createChat", userIds, userInfo.uid, null, () => {});
    socket.on("chatRoomInfo", (chatRoom) => {
      console.log("this is the chatRoom sent back from server", chatRoom);
      if (chatRoom) {
        navigate(`/room/${chatRoom.chatRoomId}`);
      }
    });
  };

  const addFriend = () => {
    socket.emit("addFriend", userInfo.uid, user._id, () => getFriends(socket));
  };

  const removeFriend = () => {
    socket.emit("removeFriend", userInfo.uid, user._id, () =>
      getFriends(socket)
    );
  };

  return (
    <div className={`user-info-container ${hover ? "hover" : ""}`}>
      <div className={`user-info-box`} onClick={user.uid ? null : startChat}>
        <UserAvatar userId={userId} status={status} src={user.profilePic} />
        <div className="user-info">
          <h3>{user.username}</h3>
          <h4>{friendStatus}</h4>
        </div>
      </div>
      {user.uid ? (
        <MainDropdown />
      ) : (
        <Dropdown
          startChat={startChat}
          addFriend={addFriend}
          removeFriend={removeFriend}
          friendStatus={friendStatus}
        />
      )}
    </div>
  );
};

export default SingleUser;
