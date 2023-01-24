import React from "react";
import './InviteFriends.scss';

const InviteFriends = ({ friends, onSelectCheckBox }) => {
    return (
        <div className="invite-friends">
            {(friends && friends.length !== 0) ? friends.map((friend, index) => (
                <div className="friend-choice" key={friend._id}>
                    <label htmlFor={`friend${index}`}>{friend.friend.username}</label>
                    <input
                        className="checkbox-input"
                        type="checkbox"
                        id={`friend${index}`}
                        name={`friend${index}`}
                        value={friend.friend.username}
                        onChange={() => onSelectCheckBox(friend.friend._id)}
                    />
                </div>
            )) : (
                <h4 className="none-text">No friends left to invite</h4>
            )}
        </div>
    );
};

export default InviteFriends;
