import React, { useContext, useState } from 'react'
import "./Write.css"
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const { url, userData, token,fetchedUser } = useContext(StoreContext);
  const nav = useNavigate()

  console.log("Fetched data",fetchedUser);
  

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${url}/blogs/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Blog added successfully");
      setFormData({
        title: "",
        description: ""
      })
    } catch (error) {
      toast.error(error.response.data.message);
      toast((t) => (
              <span>
                  Verify you'r account!
                  <button className='verify-ac-button' onClick={() => nav(`/verify/${userData.email}`)}>
                      Verify
                  </button>
              </span>
          ));
    }
  };

  return (
    <div className="main-write">
      {/* <div className="error-admin">

      </div> */}
      <div className="write-container">
        <div className="write-text">
          <h2>Write a Blog</h2>
        </div>
        <form className="write-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter blog description"
              rows={7}
              style={{
                border: "none",
                borderBottom: "2px solid #ccc",
                outline: "none",
                padding: "8px 4px",
                background: "transparent",
                fontSize: "1rem",
                transition: "border-color 0.2s",
                marginBottom: "10px",
                resize: "vertical"
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Write