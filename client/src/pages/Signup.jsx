import React from 'react'

const Signup = () => {

  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 px-5 py-5 rounded-lg md:px-8">
            <form className="w-full">
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold font-sans mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="rounded-md py-2 px-3 leading-tight"
                        name="name"
                        type="text"
                        placeholder="Name"
                        // onChange={handleInputChange}
                    />
                    {/* {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>} */}
                </div>
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold font-sans mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="rounded-md py-2 px-3 leading-tight"
                        name="username"
                        type="text"
                        placeholder="Username"
                        // onChange={handleInputChange}
                    />
                    {/* {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>} */}
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

export default Signup