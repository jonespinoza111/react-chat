import React from 'react';
import RoomDropdown from '../Dropdown/RoomDropdown';
import "./SingleRoom.scss";

const SingleRoom = ({ room, userInfo }) => {
  return (
    <div className={`user-info-container hover`}>
      <div className={`user-info-box`} onClick={() => console.log("entering room")}>
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
      <RoomDropdown />
    </div>
  )
}

export default SingleRoom;
