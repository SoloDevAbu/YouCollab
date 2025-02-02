import React, { useContext } from 'react'
import user from '../../assets/user.png'
import yLogo from '../../assets/logo/youtube.png'
import { AppContext } from '../../context/AppContext'

const YoutuberInfo = () => {

  const {userData} = useContext(AppContext);

  return (
    <div className='flex flex-col justify-center items-center'>
            {/* Youtuber profile card*/}
            <div className='flex md:flex-col md:gap-3 border-2 border-gray-700 shadow-md shadow-gray-700 md:size-fit mx-6 my-6 rounded-xl p-4 text-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                  <img src={user} alt="User name" className='size-3/4'/>
                  <h1 className='font-sans font-semibold text-2xl'>{userData?.name}</h1>
              </div>
              <div>
                  <h3 className='font-sans font-semibold'>{userData.email}</h3>
                  <p className='font-sans font-semibold'>verified</p>
                  <div className='flex bg-white rounded-lg px-2 py-1 gap-2'>
                      <img src={yLogo} alt="Youtubelogo" className='size-6'/>
                      <h3>Channel name</h3>
                      <a href="www.youtube.com/"></a>
                  </div>
              </div>
            </div>
        </div>
  )
}

export default YoutuberInfo