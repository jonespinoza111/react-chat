import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { SocketContext } from "../../context/SocketContext";
import InviteFriends from "../InviteFriends/InviteFriends";

const AddUserModal = ({ roomInfo }) => {
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const { socket } = useContext(SocketContext);
  const { userInfo, userFriends, getUserRooms } = useContext(AuthContext);
  const { closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const addUsers = (e) => {
    e.preventDefault();
    if (!roomInfo.roomName && roomInfo.userIds.length <= 2) {
      let userIds = roomInfo.userIds.map((userId) => userId._id);
      socket.emit(
        "createChat",
        [...userIds, ...selectedUsers],
        userInfo.uid,
        null,
        (chatRoom) => {
          getUserRooms(socket);
          if (chatRoom) {
            navigate(`/room/${chatRoom.chatRoomId}`);
          }
          closeModal();
        }
      );
    } else {
      socket.emit("addUsersToRoom", roomInfo._id, [...selectedUsers], () => {
        getUserRooms(socket);
        closeModal();
      });
    }
  };

  const onSelectCheckBox = (friendId) => {
    if (selectedUsers.has(friendId)) {
      setSelectedUsers(
        (prevState) => new Set([...prevState].filter((id) => id !== friendId))
      );
    } else {
      setSelectedUsers((prevState) => new Set(prevState.add(friendId)));
    }
  };

  return (
    <div className="add-user-modal">
      <div className="title-row">
        <h3>Add Users to Room</h3>
      </div>
      <h4>Select users to invite</h4>
      <form className="create-room-form" onSubmit={addUsers}>
        <div className="form-input-container">
          <label htmlFor="roomName">Invite Friends</label>
          <div className="invite-friends-container">
            <InviteFriends
              friends={userFriends
                .filter((friend) => friend.status === "accepted")
                .filter((friend) => {
                  const isFriendInRoom = roomInfo.userIds.some(
                    (user) => user.username === friend.friend.username
                  );
                  return !isFriendInRoom;
                })}
              onSelectCheckBox={onSelectCheckBox}
            />
          </div>
        </div>
        <div className="row">
          <button className="add-user-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
