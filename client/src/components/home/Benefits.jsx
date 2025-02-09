import React from 'react'
import benefitsIcon from '../../assets/home/features/save-time.png'
import BenefitsCard from './BenefitsCard'
import saveTimeLogo from '../../assets/home/features/time.png'
import integrationLofo from '../../assets/home/features/data-integrity.png'
import securityLogo from '../../assets/home/features/robustness.png'
import scalabilityLofo from '../../assets/home/features/scalability.png'

const Benefits = () => {
    return (
        <div className='my-5 md:my-20'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex items-center gap-2 shadow-2px rounded-xl px-2'>
                    <img src={benefitsIcon} alt="" className='size-4' />
                    <p className='text-sm font-medium'>Benefits</p>
                </div>
                <div className='w-1/2 text-center flex flex-col gap-4 my-5 '>
                    <h1 className='text-3xl md:text-5xl font-bold'>Why Choose YouCollab?</h1>
                    <p className='text-sm md:text-base font-medium text-gray-400'>Unlock unparalleled efficiency and creativity with a platform that streamlines every step of your video production and collaboration process.</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <BenefitsCard logo={saveTimeLogo} heading={"Save Time and Effort"} text={"Automate your workflow so you can focus on crafting amazing content instead of getting bogged down in manual tasks."}/>
                <BenefitsCard logo={integrationLofo} heading={"Seamless Integration"} text={"Easily connect your YouTube channel, cloud storage, and editing tools in one unified platform for a smoother workflow."}/>
                <BenefitsCard logo={securityLogo} heading={"Robust Security"} text={"Protect your valuable content with industry-leading security measures and secure cloud storage, giving you peace of mind."}/>
                <BenefitsCard logo={scalabilityLofo} heading={"Scalable & Flexible"} text={"Grow your channel and team without worry—YouCollab is built to scale, adapting effortlessly to your evolving needs."}/>
            </div>
        </div>
    )
}

export default Benefits