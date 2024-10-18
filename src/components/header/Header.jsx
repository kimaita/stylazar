import './header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSmall">Article</span>
        <span className="headerTitleLarge">Blogs</span>
      </div>
      <img 
        className="headerImg"
        src="../../assets/pic-about-01.jpg" 
        alt=""
      />
    </div>
  )
}
