import React from 'react'
import heloImage from '../assets/heroimage.jpg'
const Hero = () => {
  return (
    <div className=' px-20 pt-16 flex flex-col-reverse md:flex-row gap-4 md:gap-8 items-center'>
        <h1 className='text-3xl font-sans font-bold text-start md:text-5xl'><span className='text-red-500'>Seamlessly add your editor,</span> editors can upload the video with video title, descriptions and tags. Confirm the Upload request in Your mail send by YouCollab and video will be published</h1>
        <img src={heloImage} alt="" className='w-full md:w-1/2 rounded-lg shadow-lg'/>
    </div>
  )
}

export default Hero