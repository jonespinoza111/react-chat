import React from "react";

const ViewImageModal = ({ images }) => {
  return (
    <div className="view-image-modal">
      <img
        className="attachment-img"
        width={450}
        height={395}
        src={`http://localhost:5000${images}`}
        alt="attachment from user"
      ></img>
    </div>
  );
};

export default ViewImageModal;
