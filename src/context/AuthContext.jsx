import React, { createContext, useCallback } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userFriends, setUserFriends] = useState([]);

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

    const logout = (navigate, socket) => {
        localStorage.removeItem("currentUser");
        socket.emit('offline', userInfo.uid);
        setIsUserLoggedIn(false);
        navigate("/");
    };
    return (
        <AuthContext.Provider
            value={{
                isUserLoggedIn,
                userInfo,
                userFriends,
                checkAuthUser,
                getUserFriends,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
