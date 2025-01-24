import axios from "axios";
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getuserData = async () => {
        try {
            const {data} = axios.get('http://localhost:5000/api/v1/youtuber/profile')
            data.success ? setUserData(data.youtuberData) : alert(data.message);
        } catch (error) {
            alert(data.message);
        }
    }

    const value = {
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getuserData,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}