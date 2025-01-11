import React from 'react'
import collaborationImage from '../assets/home/YouEditCollab.jpg'

const Heading = () => {
  return (
    <div className='flex text-center pt-20 px-6 md:px-20 gap-6'>
        <div className='hidden md:block md:w-1/2'>
            <img src={collaborationImage} alt="" className='rounded-lg bg-slate-100 shadow-lg'/>
        </div>
        <div className='flex flex-col gap-5 w-full md:w-1/2 justify-center px-5'>
            <h1 className='text-2xl font-sans font-bold text-start md:text-4xl'>A collaboration Platform for Youtubers and Editors. <span className='text-red-500'>Save extra effort to upload your videos on YouTube.</span></h1>
            <button className='bg-slate-800 md:mx-8 lg:mx-14 md:mt-3 lg:mt-5 text-white hover:bg-slate-900 px-16 py-4 text-xl font-sans font-semibold rounded-lg'>Create Your Account</button>
        </div>
    </div>
  )
}

export default Heading