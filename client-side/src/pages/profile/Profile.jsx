import React, { useState } from 'react'
import "./profile.css"
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom'
import ProfilePopup from "../../components/profilepopup/ProfilePopup";
import ReactProfile from "react-profile";

const Profile = () => {
  const [popUp, setPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className='profile'>
      <div className="profileRight">
      <h1>User Profile</h1>
      <ReactProfile src="../../assets" />;
        <div className="profileInfo">
          <h4>Username: <span className="profileInfoName" onClick={setUsername}>John Doe</span></h4>
          <h4>Email: <span className="profileInfoName" onClick={setEmail}>johndoe@gmail.com</span></h4>
        </div>
        <div className="profileUpdate">
        <ProfilePopup />
        </div>
      </div>
    </div>
  );
};

export default Profile
