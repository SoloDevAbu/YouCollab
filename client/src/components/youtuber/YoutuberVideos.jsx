import React from 'react'
import sample from '../../assets/Untitled (2).png'

const YoutuberVideos = () => {
  return (
    <div className='bg-slate-200 min-h-screen p-4 my-6 mx-6 rounded-lg flex flex-col gap-6'>
      <h1 className='text-2xl font-bold mb-4'>Recent Uploads</h1>
      <div className='min-h-64 bg-slate-100 rounded-lg p-4'>
        {/*thumbnail and the tags */}
        
        {/*Title and description */}
        <div className='mt-8 font-sans flex flex-col gap-2'>
          <h1 className='text-lg font-bold'>Here the title of the video will be shown</h1>
          <h3 className='text-base font-semibold'>The description of the video will be shown here, this is just a dumb text to see how it looks and modify according to the need</h3>
        </div>
      </div>

      <div className='flex justify-center gap-6 mt-2'>
        <button className='bg-slate-700 text-white font-bold px-20 py-3 rounded-lg'>Edit</button>
        <button className='bg-blue-500 text-white font-bold px-20 py-3 rounded-lg'>Confirm</button>
      </div>
    </div>
  )
}

export default YoutuberVideos