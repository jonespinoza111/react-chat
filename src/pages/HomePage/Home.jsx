import React, { useContext, useEffect } from 'react'
import ChatMain from '../../components/ChatMain/ChatMain';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';
import { AuthContext } from '../../context/AuthContext';
import "./Home.scss";

const Home = ({ isUserLoggedIn }) => {
    const { userInfo, checkAuthUser } = useContext(AuthContext);

    // useEffect(() => {
    //     checkAuthUser();
    // }, [checkAuthUser])
    return (
        <div className="page home-page">
            {/* <MainNavbar userInfo={userInfo ? userInfo : "..."} /> */}
            {/* {homeError && <h3 style={{ color: "red" }}>{homeError}</h3>} */}
            {/* <h1 className="opener">
                Find a friend to chat or join a room!
            </h1>
            <h2 className="user-id">{userInfo && userInfo.uid}</h2> */}
            <div className="chat-container">
                <ChatSidebar userInfo={userInfo} />
                <ChatMain />
                {/* {params.chatId ? (
                    <ChatMain />
                ) : (
                    <div className="default-chat-space">
                        <h3>Start a chat or create a room!</h3>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default Home;
