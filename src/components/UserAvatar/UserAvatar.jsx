import React from 'react'
import { Link } from 'react-router-dom';
import './UserAvatar.scss';

const UserAvatar = ({ src = false }) => {

  return (
    <Link to="/home" className="avatar-link">
        <img
        className="user-avatar"
        src={require(`../../assets/${
            src || "option-1-futuristic-car.jpg"
        }`)}
        alt="user-avatar"
        />
    </Link>
  )
}

export default UserAvatar;
