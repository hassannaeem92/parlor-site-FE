import React from "react";
import "../styles/footerParlor.scss";
// import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import footerCer1 from "../../src/assets/images/footer-cer1.png";
import footerCer2 from "../../src/assets/images/footer-cer2.png";
import footerCer3 from "../../src/assets/images/footer-cer3.png";
import footerCer4 from "../../src/assets/images/footer-cer4.png";
import footerCer5 from "../../src/assets/images/footer-cer5.jpg";
import footerCer6 from "../../src/assets/images/footer-cer6.jpg";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa6";

function FooterParlor(props) {
  // return (

  //   <footer className="footer">
  //   <div className="footer-container">
  //     <div className="footer-section">
  //       <h3>About Us</h3>
  //       <p>At our beauty parlor, we offer the finest services for hair, skin, and nails, tailored to make you feel confident and beautiful.</p>
  //     </div>
  //     <div className="footer-section">
  //       <h3>Quick Links</h3>
  //       <ul>
  //         <li><Link to={"/"}>Home</Link></li>
  //         <li><Link to={"/about"}>About</Link></li>
  //         <li><Link to={"/contact"}>Contact</Link></li>
  //       </ul>
  //     </div>
  //     <div className="footer-section">
  //       <h3>Follow Us</h3>
  //       <div className="social-icons">
  //         <a href="https://m.facebook.com/She.Beauty.lounge01/" className="social-icon" target="_blank" rel="noopener noreferrer">
  //           <IoLogoFacebook />
  //         </a> 
  //         <a href="https://www.instagram.com/beauty_salon_services_at_home1/" className="social-icon" target="_blank" rel="noopener noreferrer">
  //           <IoLogoInstagram />
  //         </a>  
  //         <a href="https://wa.me/+923091113535" className="social-icon" target="_blank" rel="noopener noreferrer">
  //           <IoLogoWhatsapp />
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  

  //   <div className="footer-bottom">
  //     <p style={{color: "#fff"}}>&copy; 2024 Reys Solutions. All Rights Reserved.</p>
  //   </div>
  // </footer>
  





  // );

  return (
    <footer className="footer">
      <div className="footer-container container">
        {/* About Us Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <a href="/about"><p><span className="arrow">{'>'}</span> Mehndi Artist</p></a>
          <a href="/about"><p><span className="arrow">{'>'}</span> Threading & Face Wax</p></a>
          <a href="/about"><p><span className="arrow">{'>'}</span> Hair Treatment</p></a>
          <a href="/about"><p><span className="arrow">{'>'}</span> Terms And Conditions</p></a>
          <a href="/about"><p><span className="arrow">{'>'}</span> Privacy Policy</p></a>
        </div>


        {/* Services Section */}
        <div className="footer-section">
          <h3>All Services</h3>
          <p><span className="arrow">{'>'}</span> Bridal & Party Makeup</p>
          <p><span className="arrow">{'>'}</span> Mehndi</p>
          <p><span className="arrow">{'>'}</span> Facial Waxing</p>
          <p><span className="arrow">{'>'}</span> Hair Cut & Styling</p>
          <p><span className="arrow">{'>'}</span> Massage</p>
          <p><span className="arrow">{'>'}</span> Mani & Padi</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Registered in Pakistan</h3>
          <p>
            <span className="icon"><IoLocation /></span> 
            <strong>Main Office:</strong> 2nd Floor, Building 57 Defence Raya, Lahore
          </p>
          <p>
            <span className="icon"><IoCall /></span> 
            <strong style={{marginRight: "5px"}}>Phone:</strong> <span style={{marginLeft: "1px"}}>(+92) 309 1113535</span>
          </p>
          <p>
            <span className="icon"><IoMail /></span> 
            <strong style={{marginRight: "5px"}}>Email:</strong>Info@beautyserviceathome.com
          </p>
         
        </div>

        {/* Why Choose Us Section */}
        <div className="footer-section">
          <h3>Beauty Service - We Come to You</h3>
          <p>
            Lounge Salon is providing professional certified beauticians at your home. Our partners come to you with an affordable fixed price, premium quality products, and all salon services. Save time and book your salon in 2 minutes!
          </p>

          <div className="social-icons">
            <a href="https://m.facebook.com/She.Beauty.lounge01/" className="social-icon" target="_blank" rel="noopener noreferrer">
              <IoLogoFacebook />
            </a>
            <a href="https://www.instagram.com/beauty_salon_services_at_home1/" className="social-icon" target="_blank" rel="noopener noreferrer">
              <IoLogoInstagram />
            </a>
            <a href="https://wa.me/+923091113535" className="social-icon" target="_blank" rel="noopener noreferrer">
              <IoLogoWhatsapp />
            </a>
          </div>

        </div>
      </div>

      {/* Cities Served Section */}
      <div className="footer-cities">
        <h3>Serving In</h3>
        <div className="cities-list">
          {/* <span>Bahawalpur</span> */}
          {/* <span>Faisalabad</span> */}
          <span>Gujranwala</span>
          {/* <span>Hyderabad</span> */}
          <span>Islamabad</span>
          {/* <span>Karachi</span> */}
          <span>Lahore</span>
          <span>Multan</span>
          {/* <span>Peshawar</span> */}
          {/* <span>Quetta</span> */}
          <span>Rawalpindi</span>
          {/* <span>Sargodha</span>
          <span>Sialkot</span> */}
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="footer-trust-badges">
        <h3>Get an Appointment with Confidence</h3>
        <div className="badges">
          <div className="badge">
            <img src={footerCer1} alt="Google Reviews" />
          </div>
          <div className="badge">
            <img src={footerCer2} alt="DMCA Protected" />
          </div>
          <div className="badge">
            <img src={footerCer3} alt="DMCA Protected" />
          </div>
          <div className="badge">
            <img src={footerCer4} alt="Authorized Provider" />
          </div>
          <div className="badge">
            <img src={footerCer5} alt="Trusted Partner" />
          </div>
          <div className="badge">
            <img src={footerCer6} alt="SSL Secure" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Copyright © 2025 Reys Solutions. All Rights Reserved.</p>
      </div>
    </footer>
  );

}

export default FooterParlor;
