import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./Verify.css"
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const Verify = () => {
    const {url,fetchUserData} = useContext(StoreContext)
    const { email } = useParams();
    const [otp, setOtp] = useState("");
    const nav = useNavigate();

    const sendOtp = async()=>{
        try {
            const res = await axios.post(`${url}/users/send-otp/${email}`);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const verifyOtp = async () => {
    try {
        const res = await axios.post(`${url}/users/verify-otp/${email}`, { otp: otp });
        toast.success(res.data.message);
        fetchUserData();
        Cookies.remove("token");
        Cookies.set("token",res.data.token)
        setTimeout(() => {
            nav("/");
        }, 2000);
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

    return (
        <div className='verify-parent'>
            <div className="verify-container">
                <div className="email-button">
                    <p>Email: {email}</p> <button onClick={sendOtp}>Send OTP</button>
                </div>
                <div className="input-button">
                    <label htmlFor="otp">OTP:</label>
                    <input type="number" placeholder='OTP 4 digits' id='otp' onChange={(e) => setOtp(e.target.value)} name='otp' />
                    <button onClick={verifyOtp}>Verify</button>
                </div>
            </div>
        </div>
    )
}

export default Verify