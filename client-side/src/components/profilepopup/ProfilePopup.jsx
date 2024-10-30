import React, { useState } from 'react'
import './profilepopup.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ProfilePopup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const handleSave = () => {
        // Handle save logic here
        console.log('Profile saved:', { name, email, bio });
      };

  return (
    <Popup trigger={<button className='profilebtn'>Edit Profile</button>} modal>
        <div className='editprofile'>
            <h2  className="editheader">Edit Profile</h2>
            <form className='editform'>
                <label className='editlabel'>
                    Name:
                    <input className='editinput'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />
                </label>
                <br />
                <label className='editlabel'>
                    Email:
                    <input className='editinput'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label className='editlabel'>
                    Short Bio:
                    <input className='editinput'
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    />
                </label>
                <br />
                <button className="editbutton" type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    </Popup>
  )
}

export default ProfilePopup
