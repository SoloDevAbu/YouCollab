import React from 'react'
import PricingCTA from './PricingCTA'
import tickMark from '../../assets/home/features/tick-inside-circle.png'

const PricingPro = () => {
  return (
    <div className='bg-white shadow-2px p-4 rounded-xl'>
        <div className='mb-4'>
            <h1 className='text-xl font-semibold pb-6'>Pro</h1>
            <div className='flex items-end'>
              <h2 className='font-bold text-4xl'>$29/</h2>
              <p className='font-medium text-gray-600 text-lg'>month</p>
            </div>
            <p className='mt-2 text-sm font-medium text-gray-500'>For medium size creator whose video are not that long and file sizes are relatively small</p>
        </div>
        <PricingCTA/>
        <div className='border-b border-dashed border-black py-2'></div>
        <div className='my-6 flex flex-col gap-2'>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3>2 Editors</h3>
           </div>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3>5 uploads per month</h3>
           </div>
           <div className='flex gap-4 justify-start items-center font-medium'>
              <img src={tickMark} alt="" className='size-4'/>
              <h3> Up to 1 GB per upload</h3>
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

export default PricingPro