import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedin, userData } = useContext(AppContext);
  console.log('Navbar Context:', { isLoggedin, userData });

  // const navigateToProfile = () => {
  //   if(category === 'youtuber') {
  //     navigate('/profile/youtuber');
  //   } else if(category === 'editor') {
  //     navigate('/profile/editor');
  //   }
  // }

  return (
    <div className="border-b-2 px-3 py-2 border-gray-400 bg-red-100 flex justify-between md:px-5 lg:px-8 fixed w-full z-50">
      {/* Logo and Title */}
      <div className="flex gap-2 items-center">
        <img src={logo} alt="Logo" className="size-6" />
        <h1
          onClick={() => navigate("/")}
          className="font-sans font-bold bg-red-400 px-2 py-1 rounded-md cursor-pointer"
        >
          YouCollab
        </h1>
      </div>

      <div className="flex gap-4 items-center">

        {isLoggedin ? (
          <div
            className="w-8 h-8 bg-blue-500 text-white font-sans font-bold rounded-full flex justify-center items-center cursor-pointer"
            title={userData?.name || "Profile"}
            // onClick={() => navigateToProfile()}
          >
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-sans font-bold px-2 py-1 rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 font-sans font-bold text-white px-2 py-1 rounded-md"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
