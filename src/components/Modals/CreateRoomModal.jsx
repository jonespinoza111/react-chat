import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { SocketContext } from "../../context/SocketContext";
import InviteFriends from "../InviteFriends/InviteFriends";

const CreateRoomModal = () => {
  const [roomName, setRoomName] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const { socket } = useContext(SocketContext);
  const { userInfo, userFriends, getUserRooms } = useContext(AuthContext);
  const { closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const createRoom = (e) => {
    e.preventDefault();
    const userIds = [userInfo.uid, ...selectedUsers];
    console.log("create room userids in createroommodal", userIds);
    
    socket.emit("createChat", userIds, userInfo.uid, roomName, (roomInfo) => {
      getUserRooms(socket);
      closeModal();
      navigate(`/room/${roomInfo.chatRoomId}`);
    });
  };

  const onSelectCheckBox = (friendId) => {
    if (selectedUsers.has(friendId)) {
      console.log("unselecting");
      setSelectedUsers(
        (prevState) => new Set([...prevState].filter((id) => id !== friendId))
      );
    } else {
      console.log("selecting");
      setSelectedUsers((prevState) => new Set(prevState.add(friendId)));
    }
  };

  return (
    <div className="create-room-modal">
      <div className="title-row">
        <h3>Create New Room</h3>
      </div>
      <h4>Fill out the information</h4>
      <form className="create-room-form" onSubmit={createRoom}>
        <div className="form-input-container">
          <label htmlFor="roomName">Room Name</label>
          <input
            id="roomname"
            className="form-input input"
            type="text"
            required
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="roomName">Invite Friends</label>
          <div className="invite-friends-container">
            <InviteFriends
              friends={userFriends.filter(
                (friend) => friend.status === "accepted"
              )}
              onSelectCheckBox={onSelectCheckBox}
            />
          </div>
        </div>
        <div className="row create-room-button-row">
            <button className="create-room-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomModal;
