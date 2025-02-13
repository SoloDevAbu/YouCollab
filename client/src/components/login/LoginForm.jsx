import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginForm = () => {

    const { setIsLoggedin, setUserData } = useContext(AppContext)

    const [category, setCategory] = useState('youtuber');

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        const newErrors = {};

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
                response = await axios.post(`${BACKEND_URL}/youtuber/login`, { email, password, userType: category });
            } else if (category === 'editor') {
                response = await axios.post(`${BACKEND_URL}/editor/login`, { email, password, userType: category });
            }

            const { data } = response;
            const token = Cookies.get('token');

            if (data.success && token) {
                try {
                    const decode = jwtDecode(token);
                    setIsLoggedin(true);
                    setUserData(decode);
                    navigate('/');
                } catch (error) {
                    setErrors({ general: 'An error occurred during login. Please try again.' });
                }
            } else {
                setErrors({ general: data.message });
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrors({ general: 'User did not exists.' });
            } else {
                setErrors({ general: 'An error occurred during login. Please try again.' });
            }
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className=" bg-slate-400 container w-max mx-auto py-4 px-5 rounded-lg md:px-8 md:py-8">
            <form className="w-full" onSubmit={handleLogin}>
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
                            {loading ? 'Logging In' : 'Log In'}
                        </button>
                    </div>
                {errors.general && <p className="text-red-500 text-xs italic mt-4">{errors.general}</p>}
            </form>
        </div>
    )
}

export default LoginForm