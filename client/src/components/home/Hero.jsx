import React from 'react'
import heroImage from '../../assets/home/Hero.png'

const Hero = () => {
return (
    <div className='flex flex-col md:flex-row items-center gap-5 rounded-xl shadow-2px px-8 md:px-16 py-10 my-5 md:my-10'>
            <div className='text-center md:text-start pt-5 flex flex-col gap-4 md:w-1/2'>
                <h1 className='text-4xl md:text-6xl font-bold'>Streamline Your Video Collaboration</h1>
                <p className='font-bold md:text-lg text-gray-500'>Empowering YouTubers and Video Editors to work seamlessly—from upload to YouTube publication.</p>
                <button 
                    className='bg-gray-800 text-white mx-16 md:mx-0 py-2 rounded-xl shadow-sm shadow-slate-400 font-bold hover:bg-gray-600'
                >
                    Create Free Account
                </button>
                <p className='text-sm text-gray-500 font-semibold text-center'><span>No credit card required.</span> <br /> Join a community that transforms video creation.</p>
            </div>
            <div>
                <img src={heroImage} alt="" />
            </div>
    </div>
)
}

export default Hero