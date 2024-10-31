import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import "./home.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  console.log(search); // logs the current location of the app

  useEffect(() => {
    const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/posts"+search);
      setPosts(response.data);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
      };
      fetchPosts();
    }, [search]);
    
  return (
    <div>
      <Header />
      <Posts posts={posts} />
    </div>
  )
}



