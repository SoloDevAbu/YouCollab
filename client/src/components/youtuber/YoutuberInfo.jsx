import React from 'react'
import user from '../../assets/user.png'
import yLogo from '../../assets/logo/youtube.png'

const YoutuberInfo = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
            {/* Youtuber profile card*/}
            <div className='flex flex-col gap-3 bg-neutral-200 md:size-fit mx-6 my-6 rounded-xl p-4 text-center items-center'>
                <img src={user} alt="User name" className='size-3/4'/>
                <h1 className='font-sans font-semibold text-2xl'>Youtuber name</h1>
                <h3 className='font-sans font-semibold text-lg'>Youtuber email</h3>
                <p className='font-sans font-semibold'>verified</p>
                <div className='flex bg-white rounded-lg px-2 py-1 gap-2'>
                    <img src={yLogo} alt="Youtubelogo" className='size-6'/>
                    <h3>Channel name</h3>
                    <a href="www.youtube.com/"></a>
                </div>
            </div>
        </div>
  )
}

export default YoutuberInfo