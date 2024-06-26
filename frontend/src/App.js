import Header from "./components/header.js";
import "./App.css";
import Upload from "./components/upload.js";
import Home from "./components/home.js";
import About from "./components/about.js";
import Login from "./components/login.js";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SessionCheck from "./components/sessionCheck.js";
import Profile from "./components/profile.js";

import Signup from "./components/signup.js";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/about" element={<About />} />
          <Route path="/sessionCheck" element={<SessionCheck />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
