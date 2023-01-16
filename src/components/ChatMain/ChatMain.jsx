import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { timeFormatter } from "../../helper/TimeFormatter";
import SingleMessage from "../SingleMessage/SingleMessage";
import SingleRoom from "../SingleRoom/SingleRoom";
import SingleUser from "../SingleUser/SingleUser";
import "./ChatMain.scss";

const ChatMain = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);

  let { socket } = useContext(SocketContext);
  const { userInfo } = useContext(AuthContext);
  const { chatId } = useParams();

  useEffect(() => {
    socket.emit("getMessages", chatId, (messages) => setMessages(messages));

    socket.emit("getChatRoomInfo", chatId, (info) => {
        setChatInfo(info);
    });
  }, [socket, chatId]);

  useEffect(() => {
      if (socket) {
          console.log("this is the socket being used", socket);
      }
      socket.on("newMessage", (message) => {
          if (message.chatRoomId === chatId) {
              setMessages([...messages, message]);
          }
      });
  }, [socket, messages, chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (message) {
        socket.emit(
            "sendMessage",
            message,
            chatId,
            userInfo.uid,
            null,
            () => {
                setMessage("");
            }
        );
    }
  };

  const chatTopBar = () => {
    let users = chatInfo.userIds.filter((user) => user._id !== userInfo.uid);
    return (
      <SingleUser user={users[0]} />
    )
  }

  return (
    <div className="chat-main">
      <div className="main-container">
        {chatInfo && chatTopBar()}
        {/* {chatInfo && <SingleRoom room={chatInfo} />} */}
      </div>
      <div className="chat-area">
        {socket && messages && messages.map(({ _id, postedByUser, message, createdAt }, index) => {

        const timeAgo = timeFormatter(createdAt);

        let prevSender;
        if (index > 0) {
            prevSender = messages[index - 1].postedByUser.username;
        } else {
            prevSender = 'none'
        }

        let newMessenger = prevSender !== postedByUser.username || prevSender === 'none';

        console.log('messages what up yo ', messages[messages.length -1]);
        let isLastMessage = messages[messages.length - 1]._id === _id;

          return (
            <SingleMessage
                key={_id}
                data={{
                    timestamp: timeAgo,
                    username: postedByUser.username,
                }}
                message={message}
                direction={'left'}
                newMessenger={newMessenger}
                isLastMessage={isLastMessage}
                // direction={(postedByUser._id === userInfo.uid) ? 'right' : 'left'}
            />
          )
        })}
      </div>
      <div className="enter-message-container">
        <input
          type="text"
          placeholder="Type a message ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default ChatMain;
