import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import "./home.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://localhost:8000/api/posts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => res.json())
    .catch(error => console.log(error));
    }, []);
    
  return (
    <div>
      <Header />
      <Posts />
    </div>
  )
}



