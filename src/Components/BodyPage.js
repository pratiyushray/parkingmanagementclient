import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/BodyPage.css";

const BodyPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div id="body-page">
      {/* Hero Section */}
      <section id="hero-section">
        <div id="hero-content">
          <h1>Welcome to Parking Management System</h1>
          <p>Your one-stop solution for booking, parking, charging, and managing your wallet.</p>
          <button id="hero-button">Get Started</button>
          
        </div>
        <img
          src="https://thumbs.dreamstime.com/b/initial-rw-letter-logo-creative-modern-business-typography-vector-template-design-197849328.jpg"
          alt="Hero Illustration"
          id="hero-image"
        />
      </section>

      {/* Features Section */}
      <section id="features-section">
        <h2 id="features-title">Our Features</h2>
        <div id="features-container">
          <div
            id="feature-card"
            onClick={() => handleNavigation("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://img.icons8.com/color/96/000000/reservation.png"
              alt="Booking"
              id="feature-image"
            />
            <h3 id="feature-title">Easy Booking</h3>
            <p id="feature-description">
              Reserve your spot hassle-free with our user-friendly booking system. Plan your trips effortlessly.
            </p>
          </div>
          <div
            id="feature-card"
            onClick={() => handleNavigation("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://img.icons8.com/color/96/000000/car.png"
              alt="Parking"
              id="feature-image"
            />
            <h3 id="feature-title">Smart Parking</h3>
            <p id="feature-description">
              Locate and book secure parking spaces in your vicinity. Convenience at your fingertips.
            </p>
          </div>
          <div
            id="feature-card"
            onClick={() => handleNavigation("/charging")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://cdn2.vectorstock.com/i/1000x1000/19/26/electric-car-at-ev-charging-station-colored-vector-35941926.jpg"
              alt="Charging"
              id="feature-image"
            />
            <h3 id="feature-title">Electric Charging</h3>
            <p id="feature-description">
              Access electric vehicle charging stations with ease. Save time and charge efficiently.
            </p>
          </div>
          <div
            id="feature-card"
            onClick={() => handleNavigation("/wallet")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://img.icons8.com/color/96/000000/wallet.png"
              alt="Wallet"
              id="feature-image"
            />
            <h3 id="feature-title">Wallet Management</h3>
            <p id="feature-description">
              Track your transactions, manage funds, and enjoy exclusive cashback offers with W-Parking Wallet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BodyPage;