import "./sidebar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">Latest Posts</span>
        <div className="sidebarPost">
          <div className="sidebarPost1">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
            <span className="span">1 hour ago</span>
          </div>
          <div className="sidebarPost1">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
            <span className="span">15 mins ago</span>
          </div>
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
            <li className="sidebarListItem">Fashion</li>
            <li className="sidebarListItem">Tech</li>
            <li className="sidebarListItem">Politics</li>
            <li className="sidebarListItem">Marketing</li>
            <li className="sidebarListItem">Life</li>
        </ul>
      </div>
    </div>
  )
}
