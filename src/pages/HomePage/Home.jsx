import React from 'react'

const Home = ({ isUserLoggedIn }) => {
  return (
    <div>
      This is the home page
      {isUserLoggedIn}
    </div>
  )
}

export default Home;
