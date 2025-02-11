import React from 'react'
import { useNavigate } from 'react-router-dom'

const PricingCTA = () => {
    const navigate = useNavigate();
return (
    <div className='flex justify-center items-center'>
            <button
                    className='w-full bg-gray-800 text-white rounded-lg py-2 font-bold mb-4'
                    onClick={() => {navigate("/signup")}}
            >Get Started</button>
    </div>
)
}

export default PricingCTA