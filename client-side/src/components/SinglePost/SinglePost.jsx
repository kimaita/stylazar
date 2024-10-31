import { useEffect } from "react";
import "./singlepost.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get("/posts/" + path);
        setPost(response.data);
      } catch (error) {
        console.log('Error fetching post:', error);
      }
    };
    getPost();
    console.log(path);
  }, [path]);

  return (
    <div className="singlepost">
      <div className="singlepostWrapper">
        {post.photo && (
        <img
          src={post.photo}
          alt=""
          className="singlepostImg"
        />
        )}
        <h1 className="singlepostTitle">
          {post.title}
          <div className="singlepostEdit">
            <i className="singlepostIcon fa-solid fa-pen-to-square"></i>
            <i className="singlepostIcon fa-solid fa-delete-left"></i>
          </div>
        </h1>
          <p className="singlepostDescription">
          {post.description}
          </p>
        <div className="singlepostInfor">
          <span className="singlepostAuthor">
            Author:
            <Link to={`/?user=${post.user}`} className='link'>
            <b>{post.user}</b>
            </Link>
          </span>
          <span className="singlepostDate">{new Date(post.createdAt).toDateString}</span>
        </div>
      </div>
    </div>
  )
}
