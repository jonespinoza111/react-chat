import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { SocketContext } from "../../context/SocketContext";
import InviteFriends from "../InviteFriends/InviteFriends";

const AddUserModal = ({ roomInfo }) => {
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const { socket } = useContext(SocketContext);
  const { userFriends, getUserRooms } = useContext(AuthContext);
  const { closeModal } = useContext(ModalContext);

  const addUsers = (e) => {
    e.preventDefault();
    console.log("adding the users", selectedUsers);
    socket.emit("addUsersToRoom", roomInfo._id, [...selectedUsers], () => {
      getUserRooms(socket);
      closeModal();
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
          <button className="create-room-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
