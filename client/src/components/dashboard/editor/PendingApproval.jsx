import React from 'react'
import VideoComponent from './VideoComponent'
import thumbnail from '../../../assets/Untitled (2).png'

const PendingApproval = () => {
  return (
    <div className='bg-gray-200 rounded-lg h-screen m-4 p-4'>
      {/* <div className='bg-gray-300 rounded-lg p-4 text-center'>
        <h1 className='font-semibold text-lg'>No Pending Videos</h1>
      </div> */}
      <VideoComponent thumbnail={thumbnail} title={'title'} description={'description'} tags={['hi', 'hellow']} status={'Pending'}/>
    </div>
  )
}

export default PendingApproval