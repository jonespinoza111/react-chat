import React, { createContext, useCallback } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const checkAuthUser = useCallback(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            console.log("checking right now and there is user");
            setIsUserLoggedIn(true);
            console.log("this is what is getting parsed right now ", JSON.parse(atob(currentUser.split(".")[1])));
            setUserInfo(JSON.parse(atob(currentUser.split(".")[1])));
        }
    }, []);

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
                checkAuthUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
