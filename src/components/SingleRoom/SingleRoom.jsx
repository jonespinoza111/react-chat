import React from 'react';
import RoomDropdown from '../Dropdown/RoomDropdown';

const SingleRoom = ({ room }) => {
  return (
    <div className={`user-info-container hover`}>
      <div className={`user-info-box`} onClick={() => console.log("entering room")}>
        {/* <UserAvatar /> */}
        <div className="user-info">
          <h3>{room.name}</h3>
          <h4>Hello</h4>
        </div>
      </div>
      <RoomDropdown />
    </div>
  )
}

export default SingleRoom;
