import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./PageNotFound.css"

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-message">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="notfound-buttons">
        <button onClick={() => navigate(-1)} className="notfound-btn">Go Back</button>
        <button onClick={() => navigate('/')} className="notfound-btn">Go Home</button>
      </div>
    </div>
  )
}

export default PageNotFound