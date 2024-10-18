import "./navbar.css"
import { Link } from "react-router-dom";

export default function NavBar() {
    const user = true;
  return (
    <div className="nav">
        <div className="navleft">STYLAZAR</div>
        <div className="navcenter">
            <ul className="navList">
                <li className="navListItem">
                    <Link className="navLink" to="/">HOME</Link>
                </li>
                <li className="navListItem"><Link className="navLink" to="/">ABOUT US</Link></li>
                <li className="navListItem"><Link className="navLink" to="/">CREATE</Link></li>
                <li className="navListItem"><Link className="navLink" to="/">PROFILE</Link></li>
                <li className="navListItem">
                    {user && "SIGNOUT"}
                </li>
            </ul>
        </div>
        <div className="navright">
            {
                user ? (
                    <img
                    className="navImg"
                    src="https://www.pexels.com/photo/profile-view-of-young-redhead-woman-at-sunset-12244374/"
                    alt=""
            />
                ) : (
                    <ul className="navList">
                        <li className="navListItem">
                            <Link className="link" to="/signin">SIGNIN</Link>
                        </li>
                        <li className="navListItem">
                            <Link className="link" to="/register">REGISTER</Link>
                        </li>
                    </ul>
                )
            }
            <i className="navSearchIcon fa-solid fa-magnifying-glass"></i>

        </div>
    </div>
  )
}
