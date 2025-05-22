import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import "./Home.css"
import { useNavigate } from 'react-router-dom';

const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff} second${diff !== 1 ? 's' : ''} ago`;
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  const days = Math.floor(diff / 86400);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

const Home = () => {
  const { url, searchResult } = useContext(StoreContext);
  const [blogs, setBlogs] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const nav = useNavigate();

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get(`${url}/blogs/all`);
      setBlogs(res.data.blogs)
    } catch (error) {
      toast.error("Error while fetching blogs")
    }
  }

  console.log(blogs);
  
  const blogDetails = (id) => {
    nav(`/blog-details/${id}`)
  }

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.dropdown-dot')) setDropdownOpen(null);
    };
    if (dropdownOpen !== null) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const filteredBlogs = !searchResult
    ? blogs
    : blogs.filter(ele =>
        ele.title?.toLowerCase().includes(searchResult.toLowerCase()) ||
        ele.createdBy?.username?.toLowerCase().includes(searchResult.toLowerCase()) ||
        ele.description?.toLowerCase().includes(searchResult.toLowerCase())
      );

  return (
    <div className='home-parent'>
      <div className="home-container">
        {
          filteredBlogs.map((ele, idx) => {
            const userImageUrl = ele.createdBy?.image
              ? `${url}/images/${ele.createdBy.image.split(/[\\/]/).pop()}`
              : null;

            return (
              <div className='blog-box-parent' key={idx}>
                <div className="blog-box-container">
                  <div className="home-user-dot">
                    <div className="home-user-section">
                      {userImageUrl ? (
                        <img
                          src={userImageUrl}
                          alt="User"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "8px"
                          }}
                        />
                      ) : (
                        <i className="fa-solid fa-circle-user"></i>
                      )}
                      <p>{ele.createdBy?.username} </p>
                      <p className='home-ago'>
                        • {timeAgo(ele.createdAt)}
                      </p>
                    </div>
                    <div className="dropdown-dot" style={{ position: "relative" }}>
                      <i
                        className="fa-solid fa-ellipsis-vertical"
                        style={{ cursor: "pointer" }}
                        onClick={() => setDropdownOpen(dropdownOpen === idx ? null : idx)}
                      ></i>
                      <div className={`dropdown-menu${dropdownOpen === idx ? " show" : ""}`}>
                        <div className="dropdown-item">Follow Publisher</div>
                        <div className="dropdown-item">Mute Author</div>
                        <div className="dropdown-item red">Report Blog</div>
                      </div>
                    </div>
                  </div>
                  <div className="home-title-desc">
                    <h2>{ele.title}</h2>
                    <p className='home-desc'>
                      {
                        ele.description
                          .split(' ')
                          .slice(0, 15)
                          .join(' ')
                      }
                      {ele.description.split(' ').length > 15 && <span className='home-read-more' onClick={() => blogDetails(ele._id)}> Read More...</span>}
                    </p>
                  </div>
                  <div className="home-like-other">
                    <div>
                      <i className="fa-solid fa-calendar"></i>{' '}
                      {new Date(ele.createdAt).toLocaleDateString()}
                    </div>
                    <div><i className="fa-solid fa-thumbs-up"></i> 10K</div>
                    <div><i className="fa-solid fa-comment"></i> 528</div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home