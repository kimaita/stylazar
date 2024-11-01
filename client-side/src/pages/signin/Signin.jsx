import { Link } from "react-router-dom";
import "./signin.css";
import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../components/context/Context";

export default function Signin() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch({ type: "SIGNIN_START" });
    try {
      // const response = await axios.post("/http://localhost:5000/api/auth/login", {
      //     user: userRef.current.value,
      //     password: passwordRef.current.value,
      // });
      const response = await axios.post(
        "http://localhost:8000/api/v1/login/access_token",
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      dispatch({ type: "SIGNIN_SUCCESS", payload: response.data });
      window.location.replace("/");
    } catch (error) {
        console.log(error)
      setMessage("Wrong email or password");
      dispatch({ type: "SIGNIN_FAILURE" });
    }
  };

  return (
    <div className="signin">
      <div className="signinWelcome">
        <h2 className="signinWelcomeTitle">Welcome Back!</h2>
      </div>
      <span className="signinHeading">SignIn</span>
      <form className="signinForm" onSubmit={handleSignin}>
        <label>User</label>
        <input
          type="name"
          className="signinInput"
          placeholder="Enter your Name"
        //   value={userRef}
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="signinInput"
          placeholder="Enter your Password"
        //   value={passwordRef}
          ref={passwordRef}
        />
        <button type="submit" className="signinButton" disabled={isFetching}>
          SignIn
        </button>
        {message && <p>{message}</p>}
      </form>
      <label className="signinlabel">
        Don't have an account?
        <Link className="signinlabellink" to="/register">
          Register Here
        </Link>
      </label>
    </div>
  );
}
