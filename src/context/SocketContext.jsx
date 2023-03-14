import React, { useEffect, createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

let socket;
const ENDPOINT = "http://chat-server-wc7r.onrender.com";
socket = io(ENDPOINT);

const SocketProvider = ({ uid, children }) => {
  useEffect(() => {
    if (uid) {
      socket.emit("online", uid, (error) => {
        if (error) {
          alert(error);
        }
      });
      socket.on("disconnect", () => {
        socket.emit("offline", uid);
      });
    }
  }, [socket, uid]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
