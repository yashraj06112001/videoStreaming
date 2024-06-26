import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header className="app-header">
      <h1>Video Streaming App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload Video</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sessionCheck">session check</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>

          <li>
            <Link to="/signUp">signUp</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
