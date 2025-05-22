import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className='footer-parent'>
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/profile">Profile</Link>
          <Link to="/setting">Settings</Link>
          <Link to="/write">Write</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Medium Blog. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer