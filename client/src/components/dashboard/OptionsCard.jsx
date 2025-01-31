import React from 'react'

const OptionsCard = ({logo, name}) => {
    return (
        <div className='bg-gray-200 w-full mt-2 py-2 px-4 rounded-lg flex items-center cursor-pointer'>
            <img src={logo} alt="Channel" className='h-6' />
            <h3 className='font-semibold mx-auto'>{name}</h3>
        </div>
    )
}

export default OptionsCard