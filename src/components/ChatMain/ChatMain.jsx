import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { timeFormatter } from "../../helper/TimeFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmileWink,
  faImage,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import SingleMessage from "../SingleMessage/SingleMessage";
import SingleRoom from "../SingleRoom/SingleRoom";
import ScrollToBottom from "react-scroll-to-bottom";
import ImageUploading from "react-images-uploading";
import "./ChatMain.scss";
import EmojiPicker from "emoji-picker-react";

const ChatMain = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  //adding images
  const [images, setImages] = useState([]);

  const maxNumber = 4;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  // adding images ends

  let { socket } = useContext(SocketContext);
  const { userInfo } = useContext(AuthContext);
  const { chatId } = useParams();

  useEffect(() => {
    if (!socket) return;
    socket.emit("getMessages", chatId, (messages) => setMessages(messages));

    socket.emit("getChatRoomInfo", chatId, (info) => {
      setChatInfo(info);
    });

    socket.on("updatedChatRoomInfo", (info) => {
      setChatInfo(info);
    });

    return () => {
      socket.off("updatedChatRoomInfo");
    };
  }, [socket, chatId]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (message) => {
      if (message.chatRoomId === chatId) {
        setMessages([...messages, message]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    let newImages = images.map((image) => image.file);
    let formData = new FormData();
    let attachments;

    if (images && images.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        formData.append(`images`, newImages[i]);
      }

      try {
        const response = await fetch("https://chat-server-wc7r.onrender.com/images", {
          method: "POST",
          // headers: { "Content-Type": "multipart/form-data" },
          body: formData,
        });
        const body = await response.json();

        attachments = { imagePaths: body.imagePaths };
      } catch (err) {
        console.log("There was an error processing the images", err);
      }
    }

    if (message || images) {
      socket.emit(
        "sendMessage",
        message,
        chatId,
        userInfo.uid,
        attachments,
        () => {
          setMessage("");
          setImages([]);
        }
      );
    }
  };

  const [isTyping, setIsTyping] = useState(new Set());
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("userTyping", (typerId) => {
      let newSet = new Set(isTyping);

      if (!isTyping.has(typerId)) {
        newSet.add(typerId);
        setIsTyping(newSet);
      }
    });

    socket.on("userStoppedTyping", (typerId) => {
      let newSet = new Set(isTyping);

      newSet.delete(typerId);
      setIsTyping(newSet);
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [socket, isTyping]);

  const handleInput = (e) => {
    setMessage(e.target.value);

    socket.emit("typingStarted", chatId, userInfo.uid);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typingEnded", chatId, userInfo.uid);
      }, 1000)
    );
  };

  const chatTopBar = () => {
    return <SingleRoom room={chatInfo} userInfo={userInfo} />;
  };

  const renderTyping = (typerId) => {
    let userTyping = chatInfo.userIds.filter((user) => user._id === typerId);
    return (
      <h3 className="is-typing-text">{userTyping[0].username} is typing ...</h3>
    );
  };

  return (
    <div className="chat-main">
      <div className="main-container">
        {chatInfo && chatTopBar()}
        {/* {chatInfo && <SingleRoom room={chatInfo} />} */}
      </div>
      <ScrollToBottom className="chat-area">
        {socket &&
          messages &&
          messages.map(
            ({ _id, postedByUser, message, attachments, createdAt }, index) => {
              const timeAgo = timeFormatter(createdAt);

              let prevSender;
              if (index > 0) {
                prevSender = messages[index - 1].postedByUser.username;
              } else {
                prevSender = "none";
              }

              let newMessenger =
                prevSender !== postedByUser.username || prevSender === "none";

              let isLastMessage = messages[messages.length - 1]._id === _id;

              return (
                <SingleMessage
                  key={_id}
                  data={{
                    timestamp: timeAgo,
                    username: postedByUser.username,
                  }}
                  message={message}
                  attachments={attachments}
                  direction={"left"}
                  newMessenger={newMessenger}
                  isLastMessage={isLastMessage}
                />
              );
            }
          )}
      </ScrollToBottom>
      <div className="is-typing-row">
        {isTyping &&
          [...isTyping].length < 2 &&
          [...isTyping]
            .filter((typer) => typer !== userInfo.uid)
            .map((typer) => renderTyping(typer))}
        {isTyping && [...isTyping].length >= 2 && (
          <h3 className="is-typing-text">multiple users are typing ...</h3>
        )}
      </div>
      <div className="enter-message-container">
        <input
          type="text"
          placeholder="Type a message ..."
          value={message}
          onChange={handleInput}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <div className="buttons-container">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper upload-image-container">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  className="choose-image-button"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <FontAwesomeIcon icon={faImage} />
                </button>
                &nbsp;
                {images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="60" height="60" />
                    <button
                      className="remove-image-button"
                      onClick={() => onImageRemove(index)}
                    >
                      <FontAwesomeIcon className="times-icon" icon={faTimes} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <div className="emoji-picker-container">
            <button
              className="emoji-picker-button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FontAwesomeIcon
                className="emoji-picker-icon"
                icon={faFaceSmileWink}
              />
            </button>
            {showEmojiPicker && (
              <EmojiPicker
                width={300}
                height={400}
                onEmojiClick={(emoji) =>
                  setMessage((prev) => `${prev}${emoji.emoji}`)
                }
              />
            )}
          </div>
        </div>
        {showEmojiPicker && (
          <div
            className="under-emoji-picker"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ChatMain;
