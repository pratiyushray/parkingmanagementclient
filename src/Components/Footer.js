import React from 'react';
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <div class="footer">
        <div class="footer-content">
            <p>&copy; 2024 Parking Management System. All Rights Reserved.</p>
            <ul class="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
            <div class="social-media">
                <a href="#" class="social-icon">Facebook</a>
                <a href="#" class="social-icon">Twitter</a>
                <a href="#" class="social-icon">Instagram</a>
            </div>
        </div>
    </div>
  )
}

export default Footer