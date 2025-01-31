import React from 'react'
import VideoComponent from './VideoComponent'

const RecentApproval = () => {
  return (
    <div className='flex flex-col gap-4 bg-gray-200 rounded-lg m-4 p-4'>
      <VideoComponent title={'title'} description={'this is the description'} tags={['hi', 'hellow']} status={'Approved'}/>
      <VideoComponent title={'title'} description={'this is the description'} tags={['hi', 'hellow']} status={'Approved'}/>
      <VideoComponent title={'title'} description={'this is the description'} tags={['hi', 'hellow']} status={'Approved'}/>
      <VideoComponent title={'title'} description={'this is the description'} tags={['hi', 'hellow']} status={'Approved'}/>
    </div>
  )
}

export default RecentApproval