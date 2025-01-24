import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignupForm = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({
            ...prev,
            [name]: value,
        })); 
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const {name, email, password} = signupInfo;

        const newErrors = {};

        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/youtuber/singin', {
                name,
                email,
                password
            })
        } catch (error) {
            
        }

    }

  return (
    <div className=" bg-slate-400 container w-max mx-auto py-4 px-5 rounded-lg md:px-8 md:py-8">
            <form className="w-full" onSubmit={handleSignup}>
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold font-sans mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="rounded-md py-2 px-3 leading-tight"
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleInputChange}
                    />
                    {/* {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>} */}
                </div>
                
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold font-sans mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md py-2 px-3 leading-tight"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                    />
                    {/* {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} */}
                </div>
                <div className="mb-6">
                    <label className="block text-black text-sm font-bold font-sans mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md py-2 px-3 leading-tight"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                    {/* {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>} */}
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-blue-500 px-4 py-2 font-bold text-white rounded-lg'>Create Account</button>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account' : 'Create Account'}
                    </button>
                </div>
                {errors.general && <p className="text-red-500 text-xs italic mt-4">{errors.general}</p>}
            </form>
        </div>
  )
}

export default SignupForm