import React from 'react'
import YoutuberInfo from '../components/youtuber/YoutuberInfo'
import YoutuberVideos from '../components/youtuber/YoutuberVideos'

const YoutuberProfile = () => {
  return (
    <div className='flex flex-col md:flex-row pt-12'>
      <div className='w-full md:w-1/4'>
        <YoutuberInfo/>
      </div>
      <div className='w-full md:w-3/4'>
        <YoutuberVideos/>
      </div>
    </div>
  )
}

export default YoutuberProfile