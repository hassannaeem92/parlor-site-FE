import "../styles/NavbarComponent.scss";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import "../styles/NavbarComponent.scss";
import CheckOutSidebar from "./CheckOutSidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/beauty-logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import profileAvatar from "../assets/images/avatar.png";
import { Dropdown } from "react-bootstrap";
import { LOGOUT } from "../store/Types/AuthTypes";
import Avatar from "react-avatar";
import { getspecificUser } from "../store/AsynMethod/UserMethod";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

export default function Header() {
  const [linksDropdownOpen, setLinksDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [path, setPath] = useState();
  const { user } = useSelector((state) => state.AuthReducers);
  const { specificUser } = useSelector((state) => state.UserReducer);
  const { cartItem } = useSelector((state) => state.CartReducers); // Add selector for cart items
  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {


  }, [categoriesWithSub]);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLinksMouseEnter = () => {
    setLinksDropdownOpen(true);
  };
  const handleLinksMouseLeave = () => {
    setLinksDropdownOpen(false);
  };

  const { token } = useSelector((state) => state.AuthReducers);

  const handleProfileMouseEnter = () => {
    setProfileDropdownOpen(true);
  };
  const handleProfileMouseLeave = () => {
    setProfileDropdownOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("nocClientToken");
    dispatch({ type: LOGOUT });
    navigate("/");
  };
  useEffect(() => {
    dispatch(getspecificUser(user?.id));
    setPath(
      `https://be.nobleoilcentre.com/profile_pics/${specificUser?.image}`
    );
  }, []);

  //   return (
  //     <div className={" NavbarComponent position-relative"}>
  //       <div className={"NavbarComponent position-relative"}>
  //         <Navbar expand="lg" style={{ backgroundColor: "#995f45", opacity: "1" }} className={"py-3"}>
  //           <Container fluid className={"px-auto px-md-4 px-lg-5"}>
  //             <Navbar.Brand className={"py-0"} onClick={() => navigate("/")}>
  //               <img style={{ height: "75px" }} src={logo} alt="Logo" />
  //               {/* <h1 style={{ color: "#6a1b4d" }} className={"text-2xl font-bold"}>Parlor</h1> */}
  //             </Navbar.Brand>
  //             <Navbar.Toggle aria-controls={"navbarScroll"} />
  //             <Navbar.Collapse id="navbarScroll">
  //               <Nav
  //                 className={"ms-auto my-2 my-lg-0 align-items-center"}
  //                 style={{ maxHeight: "100px", color: "#ffffff" }}
  //                 navbarScroll
  //               >
  //                 {/* <Nav.Link onClick={() => navigate("/shops")}>Shops</Nav.Link> */}
  //                 {/* <Nav.Link onClick={() => navigate("/offers")}>Offers</Nav.Link> */}
  //                 <Nav.Link style={{ color: "#ffffff" }} onClick={() => navigate("/")} >Home</Nav.Link>
  //                 {/* <Nav.Link onClick={() => navigate("/about")}>Service</Nav.Link> */}

  //                 {/* <Nav.Link style={{ color: "#ffffff" }} onClick={() => navigate("/about")}>Services</Nav.Link> */}

  //                 {/* <Dropdown
  //                   className="linksDropdown"
  //                   onMouseEnter={handleLinksMouseEnter}
  //                   onMouseLeave={handleLinksMouseLeave}
  //                   show={linksDropdownOpen}  
  //                 >

  //                   <Dropdown.Toggle variant="link" style={{ color: "#ffffff", textDecoration: "none" }} id="services-dropdown">
  //                     {"Services"}
  //                   </Dropdown.Toggle>


  //                   <Dropdown.Menu>
  //                     {categoriesWithSub.slice(0, -4).map((category) => (
  //                       <Dropdown.Item key={category.id} onClick={() => navigate(`/service-details/${category.serviceid}`)}>
  //                         {category.service_name}
  //                       </Dropdown.Item>
  //                     ))}
  //                   </Dropdown.Menu>
  //                 </Dropdown> */}

  // {/* <Nav.Link
  //   style={{ color: "#ffffff", cursor: "pointer" }}
  //   onClick={() => {
  //     navigate("/"); // Navigate to Home

  //     // Wait for navigation, then scroll after a small delay
  //     setTimeout(() => {
  //       const dealsSection = document.getElementById("deals-section");
  //       if (dealsSection) {
  //         dealsSection.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }, 100); // Small delay to ensure the page loads
  //   }}
  // >
  //   Deals
  // </Nav.Link> */}

  //                 <Nav.Link style={{ color: "#ffffff" }} onClick={() => navigate("/deals")}>Deals</Nav.Link>
  //                 <Nav.Link style={{ color: "#ffffff" }} onClick={() => navigate("/about")}>About</Nav.Link>
  //                 {/* <Nav.Link onClick={() => navigate("/faqs")}>FAQs</Nav.Link> */}
  //                 <Nav.Link style={{ color: "#ffffff" }} onClick={() => navigate("/contact")}>Contact</Nav.Link>




  //                 <Dropdown
  //                   className={"linksDropdown"}
  //                   onMouseEnter={handleLinksMouseEnter}
  //                   onMouseLeave={handleLinksMouseLeave}
  //                   show={linksDropdownOpen}
  //                 >
  //                   {/*</NavDropdown>*/}

  //                   {/* </Dropdown.Menu> */}

  //                 </Dropdown>
  //                 {token ? (
  //                   <Dropdown
  //                     className={"profileDropdown"}
  //                     onMouseEnter={handleProfileMouseEnter}
  //                     onMouseLeave={handleProfileMouseLeave}
  //                     show={profileDropdownOpen}
  //                   >
  //                     {/* <Dropdown.Toggle
  //                       className={
  //                         "btnLink px-2  flex justify-center items-center"
  //                       }
  //                       id="profile-dropdown-basic"
  //                     >
  //                       <div className=" flex justify-center items-center">
  //                         <Avatar
  //                           color="grey"
  //                           name={`
  //                             ${specificUser?.name}  ${specificUser?.last_name}
  //                           `}
  //                           src={path}
  //                           size="45"
  //                           round={true}
  //                         />
  //                       </div>
  //                     </Dropdown.Toggle> */}
  //                     {/* <Dropdown.Menu>
  //                       <Dropdown.Item onClick={() => navigate("/my-profile")}>
  //                         My Profile
  //                       </Dropdown.Item>
  //                       <Dropdown.Item onClick={() => navigate("/my-orders")}>
  //                         My Orders
  //                       </Dropdown.Item>
  //                       <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
  //                     </Dropdown.Menu> */}
  //                   </Dropdown>
  //                 ) : (
  //                   <>
  //                     {/* <Link to={"/login"} className={"btn px-4 mx-2 button"}>
  //                       Login
  //                     </Link> */}
  //                     {/* <Link to={"/register"} className={"btn px-4 button mx-2"}> */}
  //                     {/* Register */}
  //                     {/* Sign Up */}
  //                     {/* </Link> */}

  //                   </>
  //                 )}
  //               </Nav>
  //             </Navbar.Collapse>
  //           </Container>
  //         </Navbar>
  //         {/* Render CheckOutSidebar only if there are items in the cart */}
  //         {cartItem && cartItem.length > 0 && (
  //           <div className={"position-fixed end-0 checkOutCanvas"}>
  //             <CheckOutSidebar />
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );


  return (
    <>
      {/* New Contact Section */}
      <div style={{
        backgroundColor: '#9f5d1a',
        color: 'white',
        padding: '8px 0', // Reduced padding for a smaller look
        fontSize: '13px'  // Slightly smaller font size
      }}>
        <Container className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
          {/* Left Side - Contact Info */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* Phone */}
            <div className="d-flex align-items-center">
              <IoCall className="me-1" style={{ color: 'white', fontSize: '15px' }} />
              <span style={{ fontSize: '15px' }} >Call us: 0309-1113535</span>
            </div>

            {/* Email */}
            <div className="d-flex align-items-center">
              <IoMail className="me-1" style={{ color: 'white', fontSize: '15px' }} />
              <span style={{ fontSize: '15px' }} >Email: Info@beautyserviceathome.com</span>
            </div>

            {/* Address */}
            <div className="d-flex align-items-center">
              <IoLocation className="me-1" style={{ color: 'white', fontSize: '15px' }} />
              <span style={{ fontSize: '15px' }} >Address: Head office: F21, F-6/1 Blue Area Islamabad</span>
            </div>
          </div>

          {/* Right Side - Social Media */}
          <div className="d-flex align-items-center gap-4 me-3">
            <a href="https://m.facebook.com/She.Beauty.lounge01/" target="_blank" rel="noopener noreferrer">
              <IoLogoFacebook style={{ color: 'white', fontSize: '16px', transition: 'color 0.3s' }} className="social-ico" />
            </a>
            {/* <a href="https://m.facebook.com/She.Beauty.lounge01/" target="_blank" rel="noopener noreferrer">
              <FaTwitter style={{ color: 'white', fontSize: '16px', transition: 'color 0.3s' }} className="social-ico" />
            </a> */}
            <a href="https://www.instagram.com/beauty_salon_services_at_home1/" target="_blank" rel="noopener noreferrer">
              <IoLogoInstagram style={{ color: 'white', fontSize: '16px', transition: 'color 0.3s' }} className="social-ico" />
            </a>
            <a href="https://wa.me/+923091113535" target="_blank" rel="noopener noreferrer">
              <IoLogoWhatsapp style={{ color: 'white', fontSize: '16px', transition: 'color 0.3s' }} className="social-ico" />
            </a>
          </div>
        </Container>

        {/* Additional CSS for hover effect */}
        <style jsx>{`
    .social-ico:hover {
      color: #f0f0f0 !important;
    }
  `}</style>
      </div>
      {/* Original Header */}

      <header className="header-container shadow-sm position-relative">
      <Navbar expand="lg" className="navbar-custom py-1 px-lg-5">
        <Container fluid className="d-flex align-items-center">
          {/* Logo */}
          <Navbar.Brand className="d-flex align-items-center navbar-brand" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="logo-img" />
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle aria-controls="navbarScroll" className="border-0" />

          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav className="align-items-center">
              <Nav.Link className="bold-nav-link" onClick={() => navigate("/")}>Home</Nav.Link>
              {/* <Nav.Link className="bold-nav-link" onClick={() => navigate("https://wa.me/+923091113535")}>Book Now</Nav.Link> */}
              <Nav.Link className="bold-nav-link" href="https://wa.me/+923091113535" target="_blank" rel="noopener noreferrer">
                Order Now
              </Nav.Link>
              <Nav.Link className="bold-nav-link" onClick={() => navigate("/deals")}>Latest News</Nav.Link>
              <Nav.Link className="bold-nav-link" onClick={() => navigate("/deals")}>Deals</Nav.Link>
              
              {/* Services Dropdown with Hover */}
              <div
                className="dropdown-wrapper"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <NavDropdown
                  title="Services"
                  id="services-dropdown"
                  show={isDropdownOpen}
                >
                  {categoriesWithSub && categoriesWithSub.length > 0 ? (
                    categoriesWithSub.map((service) => (
                      <NavDropdown.Item
                        key={service.id}
                        onClick={() => navigate(`/service-details/${service.id}`)}
                      >
                        {service.name}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <NavDropdown.Item disabled>No services available</NavDropdown.Item>
                  )}
                </NavDropdown>
              </div>

              <Nav.Link className="bold-nav-link" onClick={() => navigate("/about")}>About Us</Nav.Link>
              <Nav.Link className="bold-nav-link" onClick={() => navigate("/contact")}>Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Checkout Sidebar */}
      {cartItem && cartItem.length > 0 && (
        <div style={{ zIndex: 9999 }} className="position-fixed end-0 checkOutCanvas">
          <CheckOutSidebar />
        </div>
      )}
    </header>
    </>
  );


  // {token ? (
  //   <Dropdown
  //     className="profile-dropdown"
  //     onMouseEnter={() => setProfileDropdownOpen(true)}
  //     onMouseLeave={() => setProfileDropdownOpen(false)}
  //     show={profileDropdownOpen}
  //   >
  //     <Dropdown.Toggle as="div" className="profile-avatar">
  //       <img src={path} alt="Profile" className="rounded-circle" width={40} height={40} />
  //     </Dropdown.Toggle>
  //     <Dropdown.Menu>
  //       <Dropdown.Item onClick={() => navigate("/my-profile")}>
  //         My Profile
  //       </Dropdown.Item>
  //       <Dropdown.Item onClick={() => navigate("/my-orders")}>
  //         My Orders
  //       </Dropdown.Item>
  //       <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
  //     </Dropdown.Menu>
  //   </Dropdown>
  // ) : (
  //   <>
  //     {/* <Nav.Link className="btn btn-login mx-2" onClick={() => navigate("/login")}>
  //   Login
  // </Nav.Link>
  // <Nav.Link className="btn btn-signup mx-2" onClick={() => navigate("/register")}>
  //   Sign Up
  // </Nav.Link> */}
  //   </>
  // )}


}
