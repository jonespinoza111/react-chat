import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import "./SingleMessage.scss";

const SingleMessage = ({
  data,
  message,
  direction,
  attachments,
  newMessenger,
  isLastMessage,
}) => {
  const [showTimeStamp, setShowTimeStamp] = useState(
    isLastMessage ? true : false
  );
  const { openModal } = useContext(ModalContext);

  const renderAttachments = () => {
    if (attachments && attachments.imagePaths) {
      return (
        <div className="attachments-container">
          {attachments.imagePaths.map((imagePath, index) => (
            <img
              key={index}
              className="attachment-img"
              width={165}
              height={180}
              src={`http://localhost:5000${imagePath}`}
              alt="attachment from user"
              onClick={() => openModal("ViewImageModal", imagePath)}
            ></img>
          ))}
        </div>
      );
    }
  };

  return (
    <div
      className={`single-message-container ${
        newMessenger ? "extra-padding" : null
      }`}
    >
      {newMessenger && (
        <div
          className={`row ${direction === "left" ? "flex-start" : "flex-end"}`}
        >
          <div className="message-data">
            <h3 className="username">{data.username}</h3>
          </div>
        </div>
      )}
      <div
        className={`message-text-container ${
          direction === "left" ? "flex-start" : "flex-end"
        }`}
      >
        <div
          className={`message-text`}
          onClick={() => setShowTimeStamp((prev) => !prev)}
        >
          <div className="attachments-container">{renderAttachments()}</div>
          <h3 className="text">{message}</h3>
        </div>
        <h3 className={`timestamp ${showTimeStamp ? "" : "hide"}`}>
          {data.timestamp}
        </h3>
      </div>
    </div>
  );
};

export default SingleMessage;
