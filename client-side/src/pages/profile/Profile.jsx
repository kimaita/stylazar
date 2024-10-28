import React from 'react'
import "./profile.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import SignIn from '../signin/Signin';

const Profile = () => {
    const [user, setUser] = useState(null);
   
    useEffect(() => {
      const fetchUser = async () => {
        const userData = await axios.getUser();
        setUser(userData);
      };
   
      fetchUser();
    }, []);
   
    const handleUpdateProfile = async (event) => {
      event.preventDefault();
      const updatedUser = {
        ...user,
        [event.target.name]: event.target.value,
      };
      await axios.AxiosupdateUser(updatedUser);
      setUser(updatedUser);
    };
    if (!axios.isAuthenticated()) return <SignIn to="/signin" />;
    if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
     <form onSubmit={handleUpdateProfile}>
       <label>
         Name:
         <input
           type="text"
           name="name"
           value={user.name || ''}
           onChange={handleUpdateProfile}
         />
       </label>
       <label>
         Email:
         <input
           type="email"
           name="email"
           value={user.email || ''}
           onChange={handleUpdateProfile}
         />
       </label>
       <button type="submit">Update Profile</button>
     </form>
    </div>
  )
}

export default Profile
