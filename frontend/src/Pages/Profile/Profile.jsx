import React, { useContext } from 'react'
import "./Profile.css"
import { StoreContext } from '../../Context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
  const {fetchedUser,userData,url} = useContext(StoreContext);
  const nav = useNavigate();
  console.log(userData);
  
  const imageUrl = fetchedUser?.image
        ? `${url}/images/${fetchedUser.image.split(/[\\/]/).pop()}`
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  
  return (
    <div className='profile-parent'>
      <div className="profile-container">
        <div className="user-info-parent">
          <div className="user-info-image">
            <img src={imageUrl} alt="" />
          </div>
          <div className="user-info-other">
              <div className="ui-list-first">
                    <h2>@{userData.username}</h2>
                    <Link to="/profile/edit"><button>Edit profile</button></Link>
                    <button>View archive</button>
              </div>
              <div className="ui-list-second">
                <p><span>0</span> posts</p>
                <p><span>83</span> followers</p>
                <p><span>38</span> following</p>
              </div>
          </div>
        </div>
        <div className="ui-other">

        </div>
      </div>
    </div>
  )
}

export default Profile