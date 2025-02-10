import React from 'react'
import PricingCTA from './PricingCTA'
import tickMark from '../../assets/home/features/tick-inside-circle.png'

const PricingFree = () => {
  return (
    <div className='shadow-2px p-4 rounded-xl'>
        <div className='mb-4'>
            <h1 className='text-xl font-semibold pb-6'>Basic</h1>
            <h2 className='font-bold text-4xl'>Free</h2>
            <p className='mt-2 text-sm font-medium text-gray-500'>Get up and running immediately with essential features. Experience the workflow and ease-of-use before upgrading.</p>
        </div>
        <PricingCTA/>
        <div className='border-b border-dashed border-black py-2'></div>
        <div className='my-6 flex flex-col gap-2'>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3>1 Editor</h3>
           </div>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3>2 uploads per month</h3>
           </div>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3> Up to 100 MB per upload</h3>
           </div>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3>Access to essential video upload and approval features</h3>
           </div>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3>Community-driven support and documentation</h3>
           </div>      
        </div>
    </div>
  )
}

export default PricingFree