import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import "./home.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    fetch('https://localhost:3000/api/posts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => res.json())
    .catch(error => console.log(error));
    }, []);
    const user = localStorage.getItem('user');
    const email = localStorage.getItem('email');
  return (
    <div>
      <Header />
      {user && (
    <p>Welcome {user}, {email}</p>
      )}
      <Posts />
    </div>
  )
}



