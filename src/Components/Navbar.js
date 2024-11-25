import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Parking Management System</div>
        <ul className="navbar-links">
          <Link to="/home">Home</Link>
          <Link to="/">Parking Space</Link>
          
          {token ? (
            <>
            <Link to="/wallet">Wallet</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
