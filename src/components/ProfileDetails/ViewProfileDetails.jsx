import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";

const ViewProfileDetails = ({ profileDetails }) => {
  const date = new Date(profileDetails.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { getUserFriends, userFriends, userInfo } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  let friendStatus =
    userFriends && userFriends.find((user) => user._id === profileDetails._id);

  const addFriend = () => {
    socket.emit("addFriend", userInfo.uid, profileDetails._id, () =>
      getUserFriends(socket)
    );
  };

  const removeFriend = () => {
    socket.emit("removeFriend", userInfo.uid, profileDetails._id, () =>
      getUserFriends(socket)
    );
  };

  const friendStatusOutput = () => {
    let returnValue;
    if (friendStatus) {
      switch (friendStatus.status) {
        case "requested":
          returnValue = (
            <button onClick={removeFriend} className="friend-status-button">
              Remove Friend Request
            </button>
          );
          break;
        case "pending":
          returnValue = (
            <button onClick={addFriend} className="friend-status-button">
              Accept Friend Request
            </button>
          );
          break;
        case "accepted":
          returnValue = (
            <button onClick={removeFriend} className="friend-status-button">
              Remove Friend
            </button>
          );
          break;
        default:
          console.log("default");
      }
    } else {
      returnValue = (
        <button onClick={addFriend} className="friend-status-button">
          Add Friend
        </button>
      );
    }

    return returnValue;
  };

  useEffect(() => {
    getUserFriends(socket);
  }, [getUserFriends, socket]);
  return (
    <div className="view-profile-details">
      <div className="info-row">
        <img
          className="user-avatar"
          src={require(`../../assets/${
            profileDetails.profilePic || "option-1-futuristic-car.jpg"
          }`)}
          alt="user-avatar"
        />
      </div>
      <div className="info-row">{friendStatusOutput()}</div>
      <div className="info-row">
        <h2>Username:</h2>
        <h3>{profileDetails.username}</h3>
      </div>
      <div className="info-row">
        <h2>Member Since:</h2>
        <h3>{date}</h3>
      </div>
      <div className="info-row">
        <h2>Name:</h2>
        <h3>
          {profileDetails.firstName} {profileDetails.lastName}
        </h3>
      </div>
      <div className="info-row">
        <h2>Email:</h2>
        <h3>{profileDetails.email}</h3>
      </div>
    </div>
  );
};

export default ViewProfileDetails;
