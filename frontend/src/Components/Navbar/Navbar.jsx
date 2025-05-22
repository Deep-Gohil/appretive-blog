import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [toggle, setToggle] = useState(false)
    const { token, fetchedUser, url, setSearchResult } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleProfileNav = (e) => {
        if (!token) {
            e.preventDefault();
            toast.error("Please login first");
            setIsOpen(false);
            setToggle(false);
        } else {
            setIsOpen(false);
            setToggle(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove("token");
        window.location.reload()
    }

    const imageUrl = fetchedUser?.image
        ? `${url}/images/${fetchedUser.image.split(/[\\/]/).pop()}`
        : null;

    return (
        <div className='navbar-parent'>
            <div className="navbar-container">
                <div className="logo-search">
                    <Link to="/"><h1>Medium</h1></Link>
                    <div className="input-parent-nav">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder='Search' onChange={(e)=>setSearchResult(e.target.value)}/>
                    </div>
                </div>
                <div className="navbar-other-content">
                    <div className="write-parent">
                        <Link to="/write" className="write-parent nav-links"><i className="fa-solid fa-pen-to-square"></i>
                            Write</Link>
                    </div>
                    <i className="fa-regular fa-bell nav-links"></i>
                    <div style={{ position: "relative" }}>
                        {fetchedUser?.image ? (
                            <img
                                src={imageUrl}
                                alt="Profile"
                                className="nav-profile-img"
                                onClick={handleProfileClick}
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    cursor: "pointer"
                                }}
                            />
                        ) : (
                            <i
                                className="fa-regular fa-circle-user nav-links"
                                onClick={handleProfileClick}
                                style={{ cursor: "pointer", fontSize: "2rem" }}
                            ></i>
                        )}
                        {isOpen && (
                            <div className="popup-profile">
                                <Link
                                    to="/profile"
                                    className='nav-links'
                                    onClick={handleProfileNav}
                                >
                                    <i className="fa-regular fa-user"></i> <p>User Profile</p>
                                </Link>
                                <Link
                                    to="/setting"
                                    className='nav-links'
                                    onClick={handleProfileNav}
                                >
                                    <i className="fa-solid fa-gear"></i> <p>Settings</p>
                                </Link>
                                {
                                    token
                                        ? <Link
                                            onClick={() => { handleLogout(); setIsOpen(false); }}
                                            className='nav-links'
                                        >
                                            <i className="fa-solid fa-arrow-right-to-bracket"></i> <p>Logout</p>
                                        </Link>
                                        : <Link
                                            to="/login"
                                            className='nav-links'
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <i className="fa-solid fa-arrow-right-to-bracket"></i> <p>Login</p>
                                        </Link>
                                }
                            </div>
                        )}
                    </div>
                    <i className="fa-solid fa-bars-staggered" onClick={() => setToggle(!toggle)}></i>
                    {toggle && (
                        <div className="mobile-dropdown show">
                            <span className='navbar-span'>
                                <i className="fa-solid fa-pen-to-square nav-links"></i>
                                <Link to="/write" className="nav-links" onClick={() => setToggle(false)}>Write</Link>
                            </span>
                            <span className='navbar-span'>
                                <i className="fa-regular fa-circle-user nav-links"></i>
                                <Link
                                    to="/profile"
                                    className="nav-links"
                                    onClick={handleProfileNav}
                                >Profile</Link>
                            </span>
                            <span className='navbar-span'>
                                <i className="fa-regular fa-user nav-links"></i>
                                <Link
                                    to="/setting"
                                    className="nav-links"
                                    onClick={handleProfileNav}
                                >Settings</Link>
                            </span>
                            {
                                token
                                    ? <span className='navbar-span'>
                                        <i className="fa-solid fa-arrow-right-to-bracket nav-links"></i>
                                        <Link onClick={() => { handleLogout(); setToggle(false); }} className='nav-links'>Logout</Link>
                                    </span>
                                    : <span className='navbar-span'>
                                        <i className="fa-solid fa-arrow-right-to-bracket nav-links"></i>
                                        <Link to="/login" className="nav-links" onClick={() => setToggle(false)}>Login</Link>
                                    </span>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar