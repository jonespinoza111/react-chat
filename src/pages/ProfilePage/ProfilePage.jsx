import React, { useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import { AuthContext } from '../../context/AuthContext';
import SocketProvider from '../../context/SocketContext';
import "./ProfilePage.scss";

const ProfilePage = () => {
  const { userInfo } = useContext(AuthContext);
  return (
    <SocketProvider uid={userInfo && userInfo.uid}>
      <div className="page profile-page" >
        <Navbar />
        <div className='heading'>
          <h2>  
            Profile Details
          </h2>
        </div>
        {userInfo && (
          <ProfileDetails userInfo={userInfo} />
        )}
      </div>
    </SocketProvider>
  )
}

export default ProfilePage;
