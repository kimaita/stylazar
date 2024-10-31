import "./post.css";
import { Link } from "react-router-dom";

export default function Post({post}) {
  return (
    <div className="post">
      {post.photo && (
        <img
            className="postImg"
            src={post.photo}
            alt="" 
        />
      )}
        <div className="postInfor">
            <div className="postCategs">
              {post.categories.map((c) => (
                <span className="postCateg">{c.name}</span>))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
              <span className="postTitle">{post.title}</span>
            </Link>
            <hr />
            <div className="postView">
              <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
              <span className="Icon">
                <span><i className="postIcon fa-solid fa-heart" /></span>
                <span><i className="postIcon fa-solid fa-comment" /></span>
              </span>
            </div>
            
        </div>
        <p className="postDescri">
        {post.description}
        </p>
    </div>
  )
}
