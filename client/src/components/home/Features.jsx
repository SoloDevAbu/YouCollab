import React from 'react'
import flameIcon from '../../assets/home/flame.png'
import FeaturesCard from './FeaturesCard'

import singupImage from '../../assets/home/features/signup.png'
import collaboratorLogo from '../../assets/home/features/collaboration.png'
import addYoutubeLogo from '../../assets/home/features/secure-password.png'
import uploadLogo from '../../assets/home/features/cloud.png'
import emailNotification from '../../assets/home/features/notification.png'


const Features = () => {
    return (
        <div className='my-5 md:my-20'>
            {/* for showing the header */}
            <div className='flex flex-col justify-center items-center'>
                <div className='bg-white flex items-center gap-2 shadow-2px rounded-xl px-2'>
                    <img src={flameIcon} alt="" className='size-4' />
                    <p className='text-sm font-medium'>How it works</p>
                </div>
                <div className='w-1/2 text-center flex flex-col gap-4 my-5 '>
                    <h1 className='text-3xl md:text-5xl font-bold'>Experience Effortless YouTube Management</h1>
                    <p className='text-sm md:text-base font-medium text-gray-400'>Simplify your workflow with seamless integrations, secure cloud storage, and intuitive collaboration tools, so you can focus on creating impactful content.</p>
                </div>
            </div>
            {/* For showing the cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <FeaturesCard logo={singupImage} heading={'Sign Up & Create Your Account'} text={'Join YouCollab as a YouTuber or Editor in minutes and get instant access to our powerful collaboration tools.'}/>
                <FeaturesCard logo={collaboratorLogo} heading={'Collaborate With Editors'} text={'YouTubers can add trusted Editors. Editors upload, edit, and preview videos seamlessly'}/>
                <FeaturesCard logo={addYoutubeLogo} heading={'Add Your YouTube Channel'} text={'By visiting the settings option, add your YouTube channel by Google OAuth2 encryption for secure Video upload to your Channel.'}/>
                <FeaturesCard logo={uploadLogo} heading={'Editor Uploads Video'} text={'Editors can upload the video with title, description and tags and the video will be saved in cloude'}/>
                <FeaturesCard logo={emailNotification} heading={'Confirmation Email'} text={'A confirmation enami will be send to the YouTuber. On confirmation through the mail or by visiting the Youtuber dashboad, vido will be uploaded to YouTube'}/>
            </div>
        </div>
    )
}

export default Features