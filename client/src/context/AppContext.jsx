import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [category, setUserCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log('Token from Cookies:', token);
        if (token) {
            try {
                const decode = jwtDecode(token);
                console.log('Decoded Token:', decode);
                setUserData(decode);
                setIsLoggedin(true);
                setUserCategory(decode.userType)
                console.log('User Category Set:', decode.userType);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.log('No token found in cookies.');
        }
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);
    
    

    const value = {
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        category,
        setUserCategory,
        loading
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}