import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import SideBar from "../../components/sidebar/SideBar"
import "./home.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  return (
    <>
    <Header />
    <div className="home">
      <Posts />
      <SideBar />
    </div>
    </>
  )
}

