import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log('Token from Cookies:', token);
        if (token) {
            try {
                const decode = jwtDecode(token);
                console.log('Decoded Token:', decode);
                setUserData(decode);
                setIsLoggedin(true);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.log('No token found in cookies.');
        }
    }, []);
    
    

    const value = {
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}