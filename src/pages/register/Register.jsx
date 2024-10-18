import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
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
            <label>Username</label>
            <input
              type="text" 
              className="registerInput"
              placeholder="Enter your Name"
            />
            <label>Email</label>
            <input
              type="text"
              className="registerInput"
              placeholder="Enter your Email"
            />
            <label>Password</label>
            <input
              type="password"
              className="registerInput"
              placeholder="Enter your Password"
            />
            <button className="registerButton">Register</button>
        </form>
        
        <label className="label">
        Already have an account?
        <Link className="labellink" to="/signin">SignIn</Link>
        </label>
    </div>
  )
}
