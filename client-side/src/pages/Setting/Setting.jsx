import "./setting.css";
import SideBar from "../../components/sidebar/SideBar";

export default function Setting() {
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
            <span className="settingUpdateAccount">Update Your Account</span>
            <span className="settingDeleteAccount">Delete Account</span>
        </div>
        <form className="settingForm">
            <label>Profile Picture</label>
            <div className="settingPP">
                <img
                    src="https://images.pexels.com/photos/28927824/pexels-photo-28927824/free-photo-of-abstract-artistic-image-of-birch-tree-forest.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                    alt=""
                />
                <label htmlFor="fileInput">
                    <i className="settingPPIcon fa-solid fa-user"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}}/>
            </div>
            <label>UserName</label>
            <input type="text" placeholder="Georgina" />
            <label>Email</label>
            <input type="text" placeholder="georgina@gmail.com" />
            <label>Password</label>
            <input type="password" />
            <button className="settingUpdate">Update</button>
        </form>
      </div>
      <SideBar />
    </div>
  )
}
