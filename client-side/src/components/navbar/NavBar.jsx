import "./navbar.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function NavBar() {
    const { user, dispatch } = useContext(Context);

    const handleSignout = () => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
    };

    return (
    <div className="nav">
        <div className="navleft">
            <Link className="Link" to="/landingpage">STYLAZAR</Link>
            <div className="navSearch">
                <i className="navSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
        <div className="navcenter">
            <ul className="navList">
                <li className="navListItem">
                    <Link className="Link" to="/">FEED</Link>
                </li>
                <li className="navListItem">
                    <Link className="Link" to="/createpost">CREATE POST</Link>
                </li>
                <li className="navListItem">
                    <Link className="Link" to="/profile">PROFILE</Link>
                </li>
            </ul>
        </div>
        <div className="navright">
            {
                user ? (
                    <div className="navLinks">
                        <img
                            className="navImg"
                            src="../../assets/"
                            alt=""
                        />
                            <li className="navListItem" onClick={handleSignout}>SIGNOUT</li>
                    </div>
                ) : (
                    <ul className="navList">
                        <li className="navListItem">
                            <Link className="Link" to="/signin">SIGNIN</Link>
                        </li>
                        <li className="navListItem">
                            <Link className="Link" to="/register">GET STARTED</Link>
                        </li>
                    </ul>
                )
            }
        </div>
    </div>
  )
}
