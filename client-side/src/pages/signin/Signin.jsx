import { Link } from "react-router-dom";
import "./signin.css";
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

const handleSignin = async () => {
  try {
    const res = await axios.post("http://localhost:8000/login", { email, password });
    setMessage(res.data.message);
    setError(false);
    const { user, email, token } = res.data;
    localStorage.setItem("user", user);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    navigate("/profile");
  } catch (error) {
    console.error(error);
    setMessage('Error signing in. Invalid Credentials.');
    setError(true);
  }
};
  return (
    <div className="signin">
        <div className="signinWelcome">
            <h2 className="signinWelcomeTitle">Welcome Back!</h2>
        </div>
        <span className="signinHeading">SignIn</span>
        <form className="signinForm">
            <label>Email</label>
            <input
            type="email"
            className="signinInput"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
            type="password"
            className="signinInput"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignin}className="signinButton">SignIn</button>
            {message && <p>{message}</p>}
        </form>
        <label className="signinlabel">
          Don't have an account?
          <Link className="signinlabellink" to="/register">Register Here</Link>
        </label>
    </div>
  )
}
