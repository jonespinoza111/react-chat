import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import ViewProfileDetails from '../../components/ProfileDetails/ViewProfileDetails';
import { AuthContext } from '../../context/AuthContext';
import SocketProvider from '../../context/SocketContext';
import "./ProfilePage.scss";

const ProfilePage = () => {
  const { userInfo } = useContext(AuthContext);
  const { userId } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);

  const getUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`https://chat-server-wc7r.onrender.com/users/${userId}`);
      const body = await response.json();

      if (body.success) setProfileInfo(body.user)

    } catch (err) {
      console.log(err, 'There was an error getting the users information');
    }
  }, [userId]);

  useEffect(() => {
    if (userInfo && userInfo.uid !== userId) {
      getUserInfo();
    }
  }, [getUserInfo, userId, userInfo]);

  return (
    <SocketProvider uid={userInfo && userInfo.uid}>
      <div className="page profile-page" >
        <Navbar />
        <div className='heading'>
          <h2>  
            Profile Details
          </h2>
        </div>
        {userInfo && userInfo.uid === userId && (
          <ProfileDetails userInfo={userInfo} />
        )} 
        {profileInfo && (
          <ViewProfileDetails profileDetails={profileInfo} />
        )}
      </div>
    </SocketProvider>
  )
}

export default ProfilePage;
