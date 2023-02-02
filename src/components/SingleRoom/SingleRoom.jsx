import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import MemberDropdown from "../Dropdown/MemberDropdown";
import RoomDropdown from "../Dropdown/RoomDropdown";
import "./SingleRoom.scss";

const SingleRoom = ({ room, userInfo, hover = false }) => {
  console.log('my my my room info ', room);
  const navigate = useNavigate();
  const params = useParams();
  const { socket } = useContext(SocketContext);
  const { getUserRooms } = useContext(AuthContext);

  const enterRoom = () => {
    if (room._id) {
      navigate(`/room/${room._id}`);
    }
  };

  const deleteRoom = () => {
    console.log('deleting room now ', room._id);
    socket.emit("deleteChat", room._id, userInfo.uid, () => {
      getUserRooms(socket);
      navigate("/home");
    });
  };

  return (
    <div
      className={`user-info-container ${
        params.chatId === room._id && hover ? "selected" : ""
      } ${hover ? "hover" : ""}`}
    >
      <div className={`user-info-box`} onClick={enterRoom}>
        {/* <UserAvatar /> */}
        <img
          className="room-icon"
          src="https://cdn-icons-png.flaticon.com/512/195/195461.png"
          alt="room-avatar"
        />
        <div className="user-info">
          {/* <h3>{room.roomName}</h3> */}
          {/* <h4>Hello</h4> */}
          <h3>
            {room.roomName ? (
              <span>{room.roomName}</span>
            ) : (
              room.userIds.map((user) => {
                return (
                  <span key={user._id} className="username-text">
                    {user._id === userInfo.uid ? "You" : user.username}
                  </span>
                );
              })
            )}
          </h3>
          <h4>
            {room.userIds.length}{" "}
            {room.userIds.length <= 1 ? "member" : "members"}
            {!hover && <MemberDropdown members={room.userIds} />}
          </h4>
        </div>
      </div>
      {!hover && <RoomDropdown deleteRoom={deleteRoom} roomInfo={room} isInitiator={room.chatInitiator === userInfo.uid} />}
    </div>
  );
};

export default SingleRoom;
