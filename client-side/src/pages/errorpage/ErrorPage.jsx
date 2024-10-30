import React from 'react'
import "./errorpage.css"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <>
      <div className="container">
        <img src="../../assets/404 3.jpg" alt="" />
        <div className="errorFooter">
        <p>
          Sorry, the page you requested for is unavailable.
          Please go back to the Feed page! Thank You.
        </p>
        </div>
        <button><Link className="errorButton" to="/landingpage">FEED</Link></button>
      </div>
    </>
  )
}

export default ErrorPage
