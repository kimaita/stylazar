import NavBar from "./components/navbar/NavBar";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import SinglePost from "./components/SinglePost/SinglePost";
import Signin from "./pages/signin/Signin";
import Footer from "./components/footer/Footer";
import CreatePost from "./pages/createpost/CreatePost";
import SinglePo from "./pages/SinglePo/SinglePo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/post/Post";

function App() {
  const user = false;
  return (
    <Router>
      <NavBar />
      <SinglePost />
      <Footer />
    </Router>
  );
}

export default App;
