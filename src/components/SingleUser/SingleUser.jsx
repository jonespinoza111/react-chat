import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import UserAvatar from '../UserAvatar/UserAvatar';
import "./SingleUser.scss";

const SingleUser = ({ userInfo, hover = false }) => {
  return (
    <div className={`user-info-container ${hover ? "hover" : ''}`}>
        <div className={`user-info-box`} onClick={()=> console.log('Clicking the small area')} >
            <UserAvatar src={userInfo.profilePic} />
            <div className="user-info">
                <h3>{userInfo.username}</h3>
                <h4>My Account</h4>
            </div>
        </div>
        <Dropdown />
    </div>
  )
}

export default SingleUser;
