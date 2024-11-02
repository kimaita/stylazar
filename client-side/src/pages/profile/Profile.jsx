import React, { useState } from 'react'
import "./profile.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Profile () {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username: user,
      email: email,
    };
    if (file) {
      try {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        await axios.post("http://localhost:8000/api/v1/users/me/pic", data);
      } catch (err) {}
    };
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/users/me`, 
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate("/");
    } catch (err) {
      console.log('Error updating profile');
    }
  }

  return (
    <div className='profile'> 
      <div className="profileLeft">
          <h1>USER PROFILE</h1>
      </div>
      <div className="profileCenter">
        <div className="profileInfo">
          <h4 className="profileInfoTitle">Profile Details</h4>
          <img 
            src={file ? file : "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account .png"}
            alt=""
            className="profileInfoImg"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className="profileInfoName">{user}</span>
          <span className="profileInfoEmail">{email}</span>
        </div>
      </div>
      <div className="profileRight">
        <form className='profileForm' onClick={handleProfileUpdate}>
          <span className='profileFormTitle'>Account Details</span>
          <label>Username</label>
          <input
            type='text'
            placeholder='User'
            onChange={(e) => setUser(e.target.value)}
            />
          <label>Email</label>
          <input
            type='text'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            />
          <label>Password</label>
          <input type='password' placeholder='Password' />
          <button className='profileSubmitButton'>Update</button>
          <span className='profileDeleteButton'>Delete Account</span>
          <span><Link className='profileLogoutButton' to='/'>Home</Link></span>
        </form>
      </div>
    </div>
  );
};

