import React, { useEffect, createContext } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

let socket;
const ENDPOINT = 'http://localhost:5000';
socket = io(ENDPOINT);

const SocketProvider = ({ uid, children }) => {

    useEffect(() => {
        // setValue({ socket: io(ENDPOINT) });
        console.log('trying to connect socket online', socket);
        
        console.log('trying to connect socket online now', uid);
        if (uid) {
            console.log('emitting online to websocket', uid);
            socket.emit("online", uid, (error) => {
                if (error) {
                    alert(error);
                }
            });
            socket.on('disconnect', () => { 
                console.log('disconnecting on client side');
                socket.emit('offline', uid);
            });
        }

    }, [socket, uid]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;
