import React, { useContext, useRef, useState } from 'react'
import "./ProfileEdit.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const ProfileEdit = () => {
    const { userData, url, fetchedUser, fetchUserData } = useContext(StoreContext);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        username: userData?.username || "",
        bio: userData?.bio || "",
        gender: userData?.gender || "",
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChangeClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const imageUrl = fetchedUser?.image
        ? `${url}/images/${fetchedUser.image.split(/[\\/]/).pop()}`
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select an image to upload.");
            return;
        }
        const data = new FormData();
        data.append("image", selectedFile);

        try {
            const res = await axios.patch(`${url}/users/image-upload/${userData.id}`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setTimeout(() => {
                if (typeof fetchUserData === "function") fetchUserData();
            }, 1000);
        } catch (error) {
            toast.error(error)
        }
    };    

    return (
        <div className='editprofile-parent'>
            <div className="edit-profile-container">
                <h1>Edit profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="image-change-parent">
                        <div className="image-change-conatiner">
                            <div className="image-name-edit">
                                <div>
                                    <img src={imageUrl} alt="Profile" />
                                </div>
                                <p>{userData.username || "Medium User"}</p>
                            </div>

                            <button className='edit-button' type="button" onClick={handleChangeClick}>Change</button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                     {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                    <button className='edit-submit' type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileEdit