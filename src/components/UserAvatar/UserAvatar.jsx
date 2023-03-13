import React from "react";
import { Link } from "react-router-dom";
import "./UserAvatar.scss";

const UserAvatar = ({ userId, src = false, status }) => {
  let toLink = userId ? `/user/${userId}` : null;
  return (
    <Link
      to={toLink}
      onClick={(e) => e.stopPropagation()}
      className="avatar-link"
    >
      <span
        className={`status-indicator ${
          status === "online" ? "online-status" : "offline-status"
        }`}
      >
        <img
          className="user-avatar"
          src={require(`../../assets/${src || "option-1-futuristic-car.jpg"}`)}
          alt="user-avatar"
        />
      </span>
    </Link>
  );
};

export default UserAvatar;
