import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import ChatMain from '../../components/ChatMain/ChatMain';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import SocketProvider from '../../context/SocketContext';
import "./Home.scss";

const Home = ({ isUserLoggedIn }) => {
    const { userInfo } = useContext(AuthContext);
    const params = useParams();
    return (
        <SocketProvider uid={userInfo && userInfo.uid}>
            <div className="page home-page">
                <Navbar />
                <div className="chat-container">
                    <ChatSidebar userInfo={userInfo ? userInfo : ''} />
                    {params.chatId ? (
                        <ChatMain />
                    ) : (
                        <div className="default-chat-space">
                            <h3>Start a chat or create a room!</h3>
                        </div>
                    )}
                </div>
            </div>
        </SocketProvider>
    )
}

export default Home;
