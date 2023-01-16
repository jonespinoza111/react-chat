import React from 'react'
import { Link } from 'react-router-dom';
import './UserAvatar.scss';

const UserAvatar = ({ src = false, status }) => {

  return (
    <Link to="/home" className="avatar-link">
      <span
          className={`status-indicator ${
              (status === 'online') ? "online-status" : "offline-status"
          }`}
      >
        <img
        className="user-avatar"
        src={require(`../../assets/${
            src || "option-1-futuristic-car.jpg"
        }`)}
        alt="user-avatar"
        />
      </span>
    </Link>
  )
}

export default UserAvatar;
