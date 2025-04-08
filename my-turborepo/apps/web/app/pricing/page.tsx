import React from 'react'
import PricingFree from '../../components/home/PricingFree'
import PricingPro from '../../components/home/PricingPro'
import PricingPremium from '../../components/home/PricingPremium'
import dollarLogo from '../assets/home/features/dollar.png'

const Pricing = () => {
    return (
        <div className='pt-28 mx-8 md:mx-16'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex items-center gap-2 shadow-2px rounded-xl px-2'>
                    <img src={dollarLogo.src} alt="P" className='size-4' />
                    <p className='text-sm font-medium'>Pricing</p>
                </div>
                <div className='w-1/2 text-center flex flex-col gap-4 my-5 '>
                    <h1 className='text-3xl md:text-5xl font-bold'>Choose the best plane for you</h1>
                    <p className='text-sm md:text-base font-medium text-gray-400'>There are 3 planes <br /> basic, pro and premium</p>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                <PricingFree/>
                <PricingPro/>
                <PricingPremium/>
            </div>

        </div>
    )
}

export default Pricing