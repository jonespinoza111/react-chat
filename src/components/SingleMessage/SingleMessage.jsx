import React from 'react';
import "./SingleMessage.scss";

const SingleMessage = ({ 
    data,
    message,
    direction,
    attachments,
    newMessenger
}) => {
  return (
    <div
        className={`single-message-container ${
            newMessenger ? "extra-padding" : null
        }`}
    >
        {newMessenger && (
            <div
                className={`row ${
                    direction === "left" ? "flex-start" : "flex-end"
                }`}
            >
                <div className="message-data">
                    <h3 className="username">{data.username}</h3>
                </div>
            </div>
        )}
        <div
            className={`row ${
                direction === "left" ? "flex-start" : "flex-end"
            }`}
        >
            <div
                className={`message-text ${
                    data.username === "Lionel"
                        ? "own-message"
                        : "other-message"
                }`}
            >
                {/* <div className="attachments-container">
                    {renderAttachments()}
                </div> */}
                <h3 className="text">{message}</h3>
            </div>
            <h3 className="timestamp">{data.timestamp}</h3>
        </div>
    </div>
  )
}

export default SingleMessage;
