import React from 'react'

const OptionsCard = ({logo, name, onClick, isSelected}) => {
    return (
        <div 
            className={`border-2 border-gray-600 rounded-md shadow-sm shadow-black w-full mt-2 py-2 px-4 flex items-center cursor-pointer ${isSelected ? 'bg-stone-300' : 'hover:bg-stone-300'}`}
            onClick={onClick}
        >
            <img src={logo} alt="Channel" className='h-6' />
            <h3 className='font-semibold mx-auto'>{name}</h3>
        </div>
    )
}

export default OptionsCard