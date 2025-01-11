import React from 'react'

const LoginForm = () => {
    return (
        <div className=" bg-slate-400 container w-max mx-auto py-4 px-5 rounded-lg md:px-8 md:py-8">
            <form className="w-full">
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold font-sans mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md py-2 px-3 leading-tight"
                        name="email"
                        type="email"
                        placeholder="Email"
                    // onChange={handleInputChange}
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
                    // onChange={handleInputChange}
                    />
                    {/* {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>} */}
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-blue-500 px-4 py-2 font-bold text-white rounded-lg'>Create Account</button>
                </div>
                {/* <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account' : 'Create Account'}
                        </button>
                    </div> */}
                {/* {errors.general && <p className="text-red-500 text-xs italic mt-4">{errors.general}</p>} */}
            </form>
        </div>
    )
}

export default LoginForm