import NavBar from "./components/navbar/NavBar";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import SinglePost from "./components/SinglePost/SinglePost";
import Signin from "./pages/signin/Signin";
import Footer from "./components/footer/Footer";
import CreatePost from "./pages/createpost/CreatePost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Post from "./components/post/Post";
import Landingpage from "./components/landingpage/landingpage";
import ErrorPage from "./pages/errorpage/ErrorPage";
import Profile from "./pages/profile/Profile";

function App() {
  const user = true;
  return (
    <Router>
      <NavBar />
      <Profile />
      <Footer />
    </Router>
  );
}

export default App;
