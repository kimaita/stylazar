import "./sidebar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
            className=""
            src="https://images.pexels.com/photos/28926780/pexels-photo-28926780/free-photo-of-pebble-beach-and-dunes-under-cloudy-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt=""
        />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
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
