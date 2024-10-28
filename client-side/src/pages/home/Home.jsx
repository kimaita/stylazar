import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import SideBar from "../../components/sidebar/SideBar"
import "./home.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('https://localhost:3000/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => res.json())
    .then(data => setUserdata(data))
    .catch(error => console.log(error));
    }, []);
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
  return (
    <div>
      {userData && (
    <p>Welcome {username}, {email}</p>
      )}
      <Header />
      <Posts />
      <SideBar />
    </div>
  )
}

