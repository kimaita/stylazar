import "./register.css";
import { Link } from "react-router-dom";
import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios.post("http://localhost:3000/register", {user, email, password})
      .then(response => {
        setMessage(response.data.message);
        const { user, email, token } = response.data;
        localStorage.setItem("user", user);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        navigate("/signin");
      })
      .catch(error => {
        console.error(error);
        setMessage('Failed to register');
      });
  };

  return (
    <div className="register">
      <div className="registerWelcome">
        <h2 className="registerWelcomeTitle">Welcome To Stylazar</h2>
        <h3 className="registerWelcomeDescription">Create your account to get started.</h3>
      </div>
      <div className="registerContainer">
        <span className="registerHeading">Register</span>
      </div>
        <form className="registerForm">
            <label>User</label>
            <input
              type="text" 
              className="registerInput"
              placeholder="Enter your Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              className="registerInput"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              className="registerInput"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister} className="registerButton">Register</button>
            {message && <p>{message}</p>}
        </form>
        
        <label className="label">
        Already have an account?
        <Link className="labellink" to="/signin">Sign In</Link>
        </label>
    </div>
  )
}
