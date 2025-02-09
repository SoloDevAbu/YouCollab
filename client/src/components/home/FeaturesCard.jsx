import React from 'react'

const FeaturesCard = ({logo, heading, text}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 p-4 shadow-2px rounded-xl'>
        <div className='flex justify-center items-center gap-4 p-4 shadow-2px rounded-xl'>
            <img src={logo} alt="" className='size-16'/>
            <h1 className='text-base font-bold'>{heading}</h1>
        </div>
        <div className='px-4'>
            <p className='text-sm font-semibold text-gray-500'>{text}</p>
        </div>
    </div>
  )
}

export default FeaturesCard