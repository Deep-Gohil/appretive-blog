import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import toast from 'react-hot-toast';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const url = "http://localhost:8090/api";
    const [userData, setUserData] = useState({});
    const [fetchedUser, setFetchedUser] = useState({});
    const [searchResult,setSearchResult] = useState("")

    let token = Cookies.get("token");

    // console.log("token", token);

    const decodedData = () => {
        let decoded = jwtDecode(token);
        setUserData(decoded);
    }
    // console.log("userdata",userData);

    const fetchUserData = async () => {
        if (!userData?.id) return;
        try {
            const res = await axios.get(`${url}/users/${userData.id}`);
            // console.log("res", res.data.user);
            setFetchedUser(res.data.user)
        } catch (error) {
            console.log("error", error);
        }
    };
    
    useEffect(() => {
        if (token) {
            decodedData();
        }
    }, [token]);

    useEffect(() => {
        if (token && userData?.id) {
            fetchUserData();
        }
    }, [token, userData?.id]);

    const contextValue = {
        url,
        token,
        userData,
        fetchedUser,
        searchResult,
        fetchUserData,
        setSearchResult
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;