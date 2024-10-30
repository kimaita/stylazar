import React, { useState } from 'react'
import "./profile.css"
import { Link } from 'react-router-dom'


const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className='profile'>
      <div className="profileLeft">
          <h1>User Profile</h1>
      </div>
      <div className="profileCenter">
          <input type="file" onChange={handleChange} />
          <img src={file} />
      </div>
      <div className="profileRight">
          <h4>Username: <span className="profileInfoName" onClick={setUsername}>John Doe</span></h4>
          <h4>Email: <span className="profileInfoName" onClick={setEmail}>johndoe@gmail.com</span></h4>
          <h4>Password: <span className="profileInfoName" onClick={setPassword}></span></h4>
        </div>
        <div className="profileUpdate">
        </div>
    </div>
  );
};

export default Profile
