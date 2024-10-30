import React from 'react'
import { Link } from 'react-router-dom'
import './landingpage.css'

export default function Landingpage() {
  return (
    <div>
      <div className="wrapper">
          <div className="landing">
              <div className="landinginner">
                <h1 className="landingtitle">Welcome to our Blog</h1>
                <p className="landingtext">Create stories, articles or blogs from anywhere around the world.</p>
                <div className="landingbutton">
                    <Link to="/register" className="button">Get Started</Link>
                </div>
              </div>
              <div className="landingImg">
                <img src="../assets/writing.jpg" alt=""/>
              </div>
          </div>
      </div>
      <div className="landingFooter">
        <div className="landingForm">
          <h2>Contact Us</h2>
          <form>
          <label>Name</label>
            <input
              type="text" 
              className="landingInput"
              placeholder="Enter your Name"
            />
            <label>Email</label>
            <input
              type="text"
              className="landingInput"
              placeholder="Enter your Email"
            />
            <textarea placeholder="Message"></textarea>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
