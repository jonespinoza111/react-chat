import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { timeFormatter } from "../../helper/TimeFormatter";
import SingleMessage from "../SingleMessage/SingleMessage";
import SingleRoom from "../SingleRoom/SingleRoom";
import SingleUser from "../SingleUser/SingleUser";
import ScrollToBottom from 'react-scroll-to-bottom';
import "./ChatMain.scss";

const ChatMain = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);

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

    if (message) {
      socket.emit("sendMessage", message, chatId, userInfo.uid, null, () => {
        setMessage("");
      });
    }
  };

  const [isTyping, setIsTyping] = useState(new Set());
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("userTyping", (typerId) => {
      let newSet = new Set(isTyping);

      if (!isTyping.has(typerId)) {
        console.log("am I already someone is typing here");
        newSet.add(typerId);
        setIsTyping(newSet);
      }
    });

    socket.on("userStoppedTyping", (typerId) => {
      let newSet = new Set(isTyping);

      console.log("am I already stopped typing on here client side");
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
      }, 1500)
    );
  };

  const chatTopBar = () => {
    // let users = chatInfo.userIds.filter((user) => user._id !== userInfo.uid);
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
            messages.map(({ _id, postedByUser, message, createdAt }, index) => {
              const timeAgo = timeFormatter(createdAt);

              let prevSender;
              if (index > 0) {
                prevSender = messages[index - 1].postedByUser.username;
              } else {
                prevSender = "none";
              }

              let newMessenger =
                prevSender !== postedByUser.username || prevSender === "none";

              // console.log("messages what up yo ", messages[messages.length - 1]);
              let isLastMessage = messages[messages.length - 1]._id === _id;

              return (
                <SingleMessage
                  key={_id}
                  data={{
                    timestamp: timeAgo,
                    username: postedByUser.username,
                  }}
                  message={message}
                  direction={"left"}
                  newMessenger={newMessenger}
                  isLastMessage={isLastMessage}
                />
              );
            })}
          {isTyping &&
            [...isTyping]
              .filter((typer) => typer !== userInfo.uid)
              .map((typer) => renderTyping(typer))}
      </ScrollToBottom>
      <div className="enter-message-container">
        <input
          type="text"
          placeholder="Type a message ..."
          value={message}
          onChange={handleInput}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default ChatMain;
