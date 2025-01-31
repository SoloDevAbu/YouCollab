import React from 'react'
import VideoComponent from './VideoComponent'

const RejectVideos = () => {
  return (
    <div className='bg-gray-200 rounded-lg m-4 p-4'>
      <VideoComponent title={'title'} description={'description'} tags={['hi', 'hellow']} status={'Rejected'}/>
    </div>
  )
}

export default RejectVideos