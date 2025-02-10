import React from 'react'
import PricingCTA from './PricingCTA'
import tickMark from '../../assets/home/features/tick-inside-circle.png'

const PricingPremium = () => {
  return (
    <div className='shadow-2px p-4 rounded-xl'>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold pb-6'>Premium</h1>
        <div className='flex items-end'>
          <h2 className='font-bold text-4xl'>$49/</h2>
          <p className='font-medium text-gray-600 text-lg'>month</p>
        </div>
        <p className='mt-2 text-sm font-medium text-gray-500'>For larger Creators whose video files are larger in size</p>
      </div>
      <PricingCTA />
      <div className='border-b border-dashed border-black py-2'></div>
      <div className='my-6 flex flex-col gap-2'>
        <div className='flex gap-4 justify-start items-center font-medium'>
          <img src={tickMark} alt="" className='size-4' />
          <h3>Unlimited Editors</h3>
        </div>
        <div className='flex gap-4 justify-start items-center font-medium '>
          <img src={tickMark} alt="" className='size-4' />
          <h3>Unlimited uploads per month</h3>
        </div>
        <div className='flex gap-4 justify-start items-center font-medium'>
          <img src={tickMark} alt="" className='size-4' />
          <h3> No restrictions on video size</h3>
        </div>
        <div className='flex gap-4 justify-start items-center font-medium'>
          <img src={tickMark} alt="" className='size-4' />
          <h3>Access to essential video upload and approval features</h3>
        </div>
        <div className='flex gap-4 justify-start items-center font-medium'>
          <img src={tickMark} alt="" className='size-4' />
          <h3>Community-driven support and documentation</h3>
        </div>
      </div>
    </div>
  )
}

export default PricingPremium