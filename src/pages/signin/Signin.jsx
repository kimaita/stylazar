import { Link } from "react-router-dom";
import "./signin.css";

export default function Signin() {
  return (
    <div className="signin">
        <div className="signinWelcome">
            <h2 className="signinWelcomeTitle">Welcome Back!</h2>
        </div>
        <span className="signinHeading">SignIn</span>
        <form className="signinForm">
            <label>Email</label>
            <input type="text" className="signinInput" placeholder="Enter your Email" />
            <label>Password</label>
            <input type="password" className="signinInput" placeholder="Enter your Password" />
            <button className="signinButton">SignIn</button>
        </form>
        <label className="signinlabel">
          Don't have an account?
          <Link className="signinlabellink" to="/register">Register Here</Link>
        </label>
    </div>
  )
}
