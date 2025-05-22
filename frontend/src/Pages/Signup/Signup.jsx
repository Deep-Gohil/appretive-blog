import React, { useContext, useState } from 'react'
import './Signup.css'
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Signup = () => {
  const { url } = useContext(StoreContext);
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    number: '',
    role: 'user',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    try {
      let res = await axios.post(`${url}/users/signup`, formData);
      console.log("res data", res);

      Cookies.set("token", res.data.token);
      toast.success("Signup Successfull !");
      nav("/");
    } catch (error) {
      // console.log("error",error.response.data.message);
      toast.error(error.response.data.message)
    };
  };

  return (
    <div className='main-signup'>
      <div className="signup-container" style={{height:"600px"}}>
        <div className="signup-text"><h1>Sign up</h1> <p>Signup to continue</p></div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username:</label>
              <input type="text" id="name" required placeholder='Enter your username' name='username' value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="number">Number:</label>
              <input type="number" id="number" required placeholder='Enter mobile number' name='number' value={formData.number} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required placeholder='Enter your email' name='email' value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" required placeholder='Enter your password' name='password' value={formData.password} onChange={handleChange} />
            </div>
            <button type='submit'>Sign up</button>
          </form>
        </div>
        <div className="queck-signup" style={{margin:"20px"}}>
          <div className="remember-me">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <div className="access-queckly">
            <div className="access-box">Google</div>
            <div className="access-box">Facebook</div>
            <div className="access-box">Github</div>
          </div>
        </div>
      </div>
      <p className='already-have'>Already have an account? <Link to="/login" className='signup-here'>Login here</Link></p>
    </div>
  )
}

export default Signup;