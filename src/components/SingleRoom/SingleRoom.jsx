import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import RoomDropdown from '../Dropdown/RoomDropdown';
import "./SingleRoom.scss";

const SingleRoom = ({ room, userInfo, hover = false }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { socket } = useContext(SocketContext);
  const { getUserRooms } = useContext(AuthContext);

  const enterRoom = () => {
    if (room._id) {
        navigate(`/room/${room._id}`);
    }
  }

  const deleteRoom = () => {
    socket.emit('deleteChat', room._id, () => {
        getUserRooms(socket);
        navigate('/home');
    }) 
  }
  return (
    <div className={`user-info-container ${params.chatId === room._id && hover ? "selected" : ""} ${hover ? "hover" : ""}`}>
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
                            {user._id === userInfo.uid
                                ? "You"
                                : user.username}
                        </span>
                    );
                })
            )}
        </h3>
        </div>
      </div>
      {!hover && (
        <RoomDropdown enterRoom={enterRoom} deleteRoom={deleteRoom} />
      )}
    </div>
  )
}

export default SingleRoom;
