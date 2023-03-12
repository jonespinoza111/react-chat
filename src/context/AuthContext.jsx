import React, { createContext, useCallback } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userFriends, setUserFriends] = useState([]);
    const [userRooms, setUserRooms] = useState(null);

    const checkAuthUser = useCallback(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            console.log("checking right now and there is user");
            setIsUserLoggedIn(true);
            console.log("this is what is getting parsed right now ", JSON.parse(atob(currentUser.split(".")[1])));
            setUserInfo(JSON.parse(atob(currentUser.split(".")[1])));
        }
    }, []);

    const getUserFriends = useCallback(
        (socket) => {
            console.log('socket ready set goooooooogo, ', socket);
            if (userInfo) {
                socket.emit("getFriends", userInfo.uid, (friends) => {
                    setUserFriends(friends);
                    console.log(
                        "I am getting the friends now ok so wait",
                        friends
                    );
                });
            }
        },
        [userInfo]
    );

    const getUserRooms = useCallback(
        (socket) => {
            if (userInfo) {
                socket.emit('getRooms', userInfo.uid, (allRooms) => {
                    setUserRooms(allRooms);
                    console.log('all rooms in room container', allRooms);
                });
            }
        }, 
        [userInfo]
    )

    const logout = (navigate, socket) => {
        localStorage.removeItem("currentUser");
        socket.emit('offline', userInfo.uid);
        setIsUserLoggedIn(false);
        navigate("/");
        navigate(0);
    };

    const deleteAccount = async () => {
        if (userInfo) {
            try {
                const response = await fetch(
                  `http://localhost:5000/users/${userInfo.uid}`,
                  {
                    method: "DELETE"
                  }
                );
          
                const body = await response.json();
          
                if (body.success) {
                    console.log('The deletion was successful');
                }
              } catch (err) {
                console.log("There was an error updating the user", err);
              }
        }
    }
    return (
        <AuthContext.Provider
            value={{
                isUserLoggedIn,
                userInfo,
                userFriends,
                userRooms,
                checkAuthUser,
                getUserFriends,
                getUserRooms,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
