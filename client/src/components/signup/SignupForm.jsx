import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../../context/AppContext';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignupForm = () => {
    const { setIsLoggedin, setUserData } = useContext(AppContext);

    const [category, setCategory] = useState('youtuber');

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
        const { name, email, password } = signupInfo;

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

            axios.defaults.withCredentials = true;
            let response;

            if (category === 'youtuber') {
                response = await axios.post(`${BACKEND_URL}/youtuber/signup`, {
                    name,
                    email,
                    password
                })
            } else if (category === 'editor') {
                response = await axios.post(`${BACKEND_URL}/editor/signup`, {
                    name,
                    email,
                    password
                })
            }

            const { data } = response;
            const token = Cookies.get('token')

            if (data.success && token) {
                try {
                    const decode = jwtDecode(token)
                    setIsLoggedin(true);
                    setUserData(decode)
                    navigate('/');
                } catch (error) {
                    setErrors({ general: 'An error occurred during signup. Please try again.' })
                }
            } else {
                setErrors({ general: data.message });
            }

        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrors({ general: 'User already exists.' });
            } else {
                setErrors({ general: 'An error occurred during signup. Please try again.' });
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className=" bg-slate-400 container w-max mx-auto py-4 px-5 rounded-lg md:px-8 md:py-8">
            <form className="w-full" onSubmit={handleSignup}>
                <div className='flex justify-center items-center'>
                    <select
                        name="category"
                        id="category"
                        className='rounded-md font-bold bg-slate-600 text-white px-2 py-1 outline-none'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="youtuber">Youtuber</option>
                        <option value="editor">Editor</option>
                    </select>
                </div>
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
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
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
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
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
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
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

                {errors.general && <p className="text-red-500 text-xs italic text-center py-1">{errors.general}</p>}

            </form>
        </div>
    )
}

export default SignupForm