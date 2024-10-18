import "./post.css";

export default function Post() {
  return (
    <div className="post">
        <img
            className="postImg"
            src="https://images.pexels.com/photos/28927824/pexels-photo-28927824/free-photo-of-abstract-artistic-image-of-birch-tree-forest.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt="" 
        />
        <div className="postInfor">
            <div className="postCateg">
                <span className="postCateg">Politics</span>
                <span className="postCateg">Blog</span>
            </div>
            <span className="postTitle">Lorem ipsum dolor sit amet</span>
            <hr />
            <div className="postView">
            <span className="postDate">30 mins ago</span>
              <span className="Icon">
                <span><i className="postIcon fa-solid fa-heart" /></span>
                <span><i className="postIcon fa-solid fa-comment" /></span>
              </span>
            </div>
            
        </div>
        <p className="postDescri">
        Lorem ipsum odor amet, consectetuer adipiscing elit.
        Nibh feugiat porttitor sodales facilisi penatibus ullamcorper
        class natoque. Phasellus amet vivamus curabitur inceptos eros
        elit. Ipsum sollicitudin massa phasellus pulvinar arcu sagittis.
        Varius ornare id sociosqu platea, vulputate taciti eget cursus magna.
        Rutrum faucibus mus netus lacinia luctus class sapien class.
        </p>
    </div>
  )
}
