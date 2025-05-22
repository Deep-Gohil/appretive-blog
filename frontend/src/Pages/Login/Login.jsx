import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

const Login = () => {
  const {url} = useContext(StoreContext)
  const nav = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/users/login`,formData)
      // console.log("token",res.data.token);
      Cookies.set("token",res.data.token)
      nav("/")
      window.location.reload()
      toast.success("Login Successfull") 
    } catch (error) {
      toast.error(error.response.data.message);
    }  
  };

  return (
    <div className='main-signup'>
      <div className="signup-container">
        <div className="signup-text">
          <h1>Login</h1>
          <p>Login to continue</p>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                required
                placeholder='Enter your email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                required
                placeholder='Enter your password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>
        <div className="queck-signup">
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              name="remember"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <div className="access-queckly">
            <div className="access-box">Google</div>
            <div className="access-box">Facebook</div>
            <div className="access-box">Github</div>
          </div>
        </div>
      <p className='already-have'>
        Don't have an account? <Link to="/signup" className='signup-here'>Sign up here</Link>
      </p>
      </div>
    </div>
  )
}

export default Login