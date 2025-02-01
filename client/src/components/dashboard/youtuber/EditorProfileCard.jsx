import React from 'react'
import userLogo from '../../../assets/user.png'
import deleteLogo from '../../../assets/logo/trash.png'

const EditorProfileCard = ({ name, email, onClick }) => {
    return (
        <div className='flex justify-between items-center gap-4 bg-slate-100 p-4 rounded-lg shadow-lg'>
            <img src={userLogo} alt="User" className='h-28' />
            <div className='text-center'>
                <h1 className='font-bold text-lg text-gray-600'>{name}</h1>
                <h3 className='font-semibold text-gray-500'>{email}</h3>
            </div>
            <button className='hover:scale-110 transition-transform duration-200'
                onClick={onClick}
            >
                <img src={deleteLogo} alt="Delete" className='h-8' />
            </button>
        </div>
    )
}

export default EditorProfileCard