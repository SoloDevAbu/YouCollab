import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import menuIcon from '../assets/logo/menu (1).png';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedin, userData } = useContext(AppContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const handleProfileClick = () => {
    navigate('/')
  };

  return (
    <div className="border-b-2 px-3 py-2 border-gray-400 bg-white flex justify-between md:px-5 lg:px-8 fixed w-full z-50">
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

      {/* Mobile Menu Icon */}
      <div className="sm:hidden size-8" onClick={() => setToggleMenu(!toggleMenu)}>
        <img src={menuIcon} alt="Menu" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        <ul className="flex gap-2 justify-center items-center font-medium sm:gap-4 md:gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => isActive ? "underline" : ""}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Authentication Section */}
      <div className="hidden sm:flex items-center gap-4">
        {isLoggedin ? (
          <div
            className="w-8 h-8 bg-blue-500 text-white font-sans font-bold rounded-full flex justify-center items-center cursor-pointer"
            title={userData?.name || "Profile"}
            onClick={handleProfileClick}
          >
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="border-2 border-gray-700 hover:bg-gray-700 hover:text-white font-sans font-bold px-4 py-2 rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-gray-700 font-sans font-bold text-white px-4 py-2 rounded-md shadow-md shadow-white"
            >
              Signup
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {toggleMenu && (
        <div className="sm:hidden absolute top-full right-2 left-2/3 bg-white shadow-md border-t border-gray-400">
          <ul className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink 
                  to={link.path} 
                  onClick={() => setToggleMenu(false)}
                  className={({ isActive }) => isActive ? "underline" : ""}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {!isLoggedin && (
              <>
                <li>
                  <button
                    onClick={() => { setToggleMenu(false); navigate("/login"); }}
                    className="w-full text-center border-2 border-gray-700 hover:bg-gray-700 hover:text-white font-sans font-bold px-4 py-2 rounded-md"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setToggleMenu(false); navigate("/signup"); }}
                    className="w-full text-center bg-gray-700 font-sans font-bold text-white px-4 py-2 rounded-md shadow-md shadow-white"
                  >
                    Signup
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
