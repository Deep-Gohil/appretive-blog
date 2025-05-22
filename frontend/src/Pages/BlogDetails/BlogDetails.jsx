import React, { useContext, useEffect, useState } from 'react'
import "./BlogDetails.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const BlogDetails = () => {
  const { id } = useParams();
  const { url } = useContext(StoreContext);
  const [blog, setBlog] = useState({})

  const getBlog = async () => {
    try {
      const res = await axios.get(`${url}/blogs/${id}`);
      // console.log(res.data.blog);
      setBlog(res.data.blog);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className='blog-details-parent'>
      <div className="blog-details-conatiner">
        <h1>{blog.title}</h1>
        <div className="user-info-bd">
          <div className="user-name-image-bd">
            <i className="fa-regular fa-circle-user"></i>{blog.createdBy ? blog.createdBy.username : "Medium User"}
          </div>
          <button title='Follow'>Follow</button>
          <p>Feb 26,2025</p>
        </div>
        <hr />
        <div className="bd-logos">  
          <div className="like-comment">
            <div className="logos-div" title='Like'><i className="fa-regular fa-heart"></i> 2874</div>
            <div className="logos-div" title='Comments'><i className="fa-regular fa-comment"></i> 346</div>
          </div>
          <div className="save-share">
            <div className="logos-div" title='Save'><i className="fa-regular fa-bookmark"></i></div>
            <div className="logos-div" title='Share'><i className="fa-regular fa-share-from-square"></i></div>
            <div className="logos-div" title='More options'><i className="fa-solid fa-ellipsis"></i></div>
          </div>
        </div>
        <hr />
        <p>
          {blog.description &&
            blog.description.split('.').map((part, idx, arr) => [
              part.trim(),
              idx !== arr.length - 1 && <br key={idx} />
            ])
          }
        </p>
      </div>
    </div>
  )
}

export default BlogDetails