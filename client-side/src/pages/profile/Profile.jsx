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

  return (
    <div className='profile'> 
      <div className="profileLeft">
          <h1>USER PROFILE</h1>
      </div>
      <div className="profileCenter">
        <div className="profileInfo">
          <h4 className="profileInfoTitle">Profile Details</h4>
          <img src={file ? file : "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account .png"} alt="" className="profileInfoImg" />
          <span className="profileInfoName">{user}</span>
          <span className="profileInfoEmail">{email}</span>
        </div>
      </div>
      <div className="profileRight">
        <form className='profileForm'>
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
          <button className='profileSubmitButton' onClick={Link}>Update</button>
          <span className='profileDeleteButton'>Delete Account</span>
          <span><Link className='profileLogoutButton' to='/profile'>Home</Link></span>
        </form>
      </div>
    </div>
  );
};

