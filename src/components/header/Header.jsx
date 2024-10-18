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
        src="https://images.pexels.com/photos/3289131/pexels-photo-3289131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt=""
      />
    </div>
  )
}
