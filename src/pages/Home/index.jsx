import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { CiApple } from "react-icons/ci";
import { Accordion } from "react-bootstrap";
import CouponSlider from "./includes/CouponSlider";
import { Link, useNavigate } from "react-router-dom";
import Deals from "./includes/Deals";
import WorkViewSlider from "./includes/workViewslider";
import CustomerReviewSlider from "./includes/CustomerReviewSlider.jsx";
import EShopLayout from "../../components/EShopLayout.jsx";
import Header from "../../components/Header.jsx";
import FooterParlor from "../../components/FooterParlor.jsx";
import Footer from "../../components/Footer.jsx";
import ProductList from "../../components/ProductList.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import image1 from "../../assets/images/about-image2.jpeg";
import image2 from "../../assets/images/work-slider-img11.jpg";
import image3 from "../../assets/images/work-slider-img1.jpg";
import tImage1 from "../../assets/images/work-slider-img10.jpg";
import tImage2 from "../../assets/images/work-slider-img9.jpg";
import tImage3 from "../../assets/images/work-slider-img3.jpg";

import nImage1 from "../../assets/images/new-image1.jpeg";
import nImage2 from "../../assets/images/new-image2.jpeg";
// import nImage3 from "../../assets/images/new-image3.jpeg";
import nImage4 from "../../assets/images/new-image4.jpeg";
import nImage5 from "../../assets/images/new-image5.jpeg";
// import nImage6 from "../../assets/images/new-image6.jpeg";
import nImage7 from "../../assets/images/new-image7.jpeg";



import {
  getCategoriesWithSubCategories,
  getWorkSectionImages,
  getAllDeals,
  getProducts,
} from "../../store/AsynMethod/ProductMethod";
import "../../styles/Hero.scss";
import "../../styles/EShopLayout.scss";


function Home() {
  const [searchedProduct, setSearchProduct] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [accordionKey, setAccordionKey] = useState(Date.now());
  Accordion;
  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoriesWithSubCategories());
    dispatch(getAllDeals());
    dispatch(getWorkSectionImages());

  }, [dispatch]);

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearchProduct("");
    setSearchValue("");
    setAccordionKey(Date.now());
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(category.id);
      setSelectedSubCategory(category.subCategories[0]?.id || null);
    }
  };

  const handleSubCategoryClick = (subcategory) => {
    setSelectedSubCategory(subcategory?.id);
  };

  useEffect(() => {
    if (selectedCategory && selectedSubCategory) {
      dispatch(getProducts(selectedCategory, selectedSubCategory));
    }
  }, [selectedCategory, selectedSubCategory, dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      if (selectedSubCategory) {
        dispatch(getProducts(selectedCategory, selectedSubCategory));
      } else {
        dispatch(getProducts(selectedCategory));
      }
    } else {
      dispatch(getProducts());
    }
  }, [selectedCategory, selectedSubCategory, dispatch]);

  const handleSearchClick = () => {
    console.log("Clicked search");
    setSearchProduct(searchValue);
    const section = document.querySelector("#productList");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKeyDown = (e) => {
    console.log("Typing");
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };
  useEffect(() => {
    if (window.location.hash === "#productList") {
      const section = document.querySelector("#productList");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
  };

  const trendingServices = [
    { title: "Hair Care", description: "We offer expert hair care and styling services tailored to your unique needs", tImage: nImage1 },
    { title: "Mehndi", description: "We offer expert Mehdi care and styling services tailored to your unique needs", tImage: nImage7 },
    { title: "Makeup", description: "We offer expert Makeup care and styling services tailored to your unique needs", tImage: nImage2 },

  ];


  // const sliderSettingsHero = {
  //   infinite: true, // Enables smooth looping
  //   speed: 500, // Adjust speed for smooth effect
  //   slidesToShow: 1, // Show one full slide at a time
  //   slidesToScroll: 1, // Scroll one slide at a time
  //   fade: true, // Fade transition for a smooth effect
  //   autoplay: true, // Optional: Auto slide
  //   autoplaySpeed: 3000, // Change slide every 3s
  //   arrows: false, // Hide arrows for a cleaner look
  //   dots: false
  // };

  const sliderSettingsHero = {
    infinite: true,
    speed: 800, // Slower for elegance
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    dots: false,
    autoplaySpeed: 4000, // Longer interval for a calm vibe
    arrows: false,
    customPaging: () => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "#fff",
          borderRadius: "50%",
          margin: "0 5px",
        }}
      ></div>
    ), // Custom dot styling
  };

  return (
    <>
      <Header />
      {/* <div className={"HeroWrapper"}>
        <div className={"d-block "}>
          <div className={"row mx-auto justify-content-center"}>
            <div className={"col-lg-6 px-0"}>
              <div className={"h1 mb-0 fw-bold"}>
                Groceries Delivered in 90 Minut
              </div>
              <div className={"py-4 title"}>
                Get your healthy foods & snacks delivered at your doorsteps all
                day every day
              </div>
              <div className={"searchWrapper bg-white shadow"}>
                <input
                  placeholder={"Search your Products From here"}
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)} // Update searchValue here
                  style={{ boxSizing: "border-box", width: "100% !important" }}
                  onKeyDown={handleKeyDown}
                  value={searchValue} // Bind searchValue to input
                />
                <button
                  className={"btn d-flex align-items-center gap-2"}
                  onClick={handleSearchClick}
                >
                  <IoSearchOutline />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className={"HeroWrapper"}>
        <div className={"col-lg-6"}>
          <div className={""}>
            <h1 style={{size:"1px",color:"white"}}>Welcome to Your Beauty Haven</h1>
          </div>
          <div className={"py-2 title"}>
            <h6 style={{size:"1px",color:"white"}}> Discover the ultimate beauty solutions tailored for you.</h6>
          </div>
          
        </div>
      </div> */}
{/* 
<div className="HeroWrapper">
      <div className="col-lg-6 text-container">
        <h1 className="hero-title">Professional Personal Care Services at Home</h1>
        <p className="hero-subtitle">We like taking care of you!</p>
      </div>

      <div className="slider-container">
        <Slider {...sliderSettings}>
          {trendingServices.map((service, index) => (
            <div key={index} className="slider-item">
              <div
                className="slider-image"
                style={{ backgroundImage: `url(${service.tImage})` }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
    </div> */}


{/* <div className="HeroWrapper">
  <div className="overlay"></div> 
  <div className="col-lg-6 text-container-hero">
    <h1 className="hero-title">Professional Personal Care Services at Home</h1>
    <p className="hero-subtitle">We like taking care of you!</p>
  </div>

  <div className="slider-container-hero">
    <Slider {...sliderSettings}>
      {trendingServices.map((service, index) => (
        <div key={index} className="slider-item">
          <div
            className="slider-image"
            style={{ backgroundImage: `url(${service.tImage})` }}
          ></div>
        </div>
      ))}
    </Slider>
  </div>
</div> */}


{/* <div className="HeroWrapper">
  <div className="overlay"></div>
  <div className="col-lg-6 text-container-hero">
    <h1 className="hero-title">Professional Personal Care Services at Home</h1>
    <p className="hero-subtitle">We like taking care of you!</p>
  </div>

  <div className="slider-container-hero">
    <div className="banner-clip-wrapper"></div>
    <div>
      <div className="bc-image-clipper">
        <Slider {...sliderSettings}>
          {trendingServices.map((service, index) => (
            <div key={index} className="slider-item">
              <div
                className="slider-image"
                style={{ backgroundImage: `url(${service.tImage})` }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </div>
</div> */}



    {/* <div className="HeroWrapper">
      <div className="overlay"></div>
      <div className="hero-content">
        <div className="text-container-hero">
          <h1 className="hero-title">Professional Personal Care Services at Home</h1>
          <p className="hero-subtitle">We like taking care of you!</p>
        </div>

        <div className="slider-container-hero">
          <div className="banner-clip-wrapper">
            <div className="bc-image-clipper">
              <Slider {...sliderSettingsHero}>
                {trendingServices.map((service, index) => (
                  <div key={index} className="slider-item">
                    <div
                      className="slider-image"
                      style={{ backgroundImage: `url(${service.tImage})` }}
                    ></div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div> */}


{/* <div className="HeroWrapper">
  <div className="hero-left">
    <h1 className="hero-title" style={{color:"#9f5d1a"}}>Professional</h1>
    <h1 className="hero-title" style={{color:"#9f5d1a"}}> Personal Care Services at Home</h1>
    <p className="hero-subtitle" style={{color:"black", fontWeight:"bold"}}>We like taking care of you!</p>
  </div>

  <div className="hero-right">
    <div className="slider-container-hero">
      <Slider {...sliderSettingsHero}>
        {trendingServices.map((service, index) => (
          <div key={index} className="slider-item">
            <div
              className="slider-image"
              style={{ backgroundImage: `url(${service.tImage})` }}
            ></div>
          </div>
        ))}
      </Slider>
      <div>
        <h2>BOOKING within a minute</h2>
      </div>
    </div>
  </div>
</div> */}

<div className="HeroWrapper">
  {/* Left Side - Text Section */}
  <div className="hero-left">
    <h1 className="hero-title" style={{ color: "#9f5d1a" }}>Welcome to She </h1>
    <h1 className="hero-title" style={{ color: "#9f5d1a" }}> Beauty Lounge Beauty Service at Home</h1>
    <p className="hero-subtitle" style={{ color: "black", fontWeight: "bold" }}>
    Beauty Unit & Comfort!
    </p>
  </div>

  {/* Right Side - Slider Section */}
  <div className="hero-right">
    <div className="slider-container-hero">
      <Slider {...sliderSettingsHero}>
        {trendingServices.map((service, index) => (
          <div key={index} className="slider-item">
            <div
              className="slider-image"
              style={{ backgroundImage: `url(${service.tImage})` }}
            ></div>
          </div>
        ))}
      </Slider>
    </div>
    {/* Booking Section */}
    <div className="booking-section">
      <div className="booking-title">
        <a>Booking within a minute</a>
      </div>
      <div className="booking-number">
        0309-1113535
      </div>
    </div>

  </div>
</div>

  <section className="salon-section">
        <h2 className="salon-title">Professional Salon Services at Home</h2>
        <a href="https://wa.me/+923091113535" target="_blank">
            <button className="book-now-btn">
              Book Now
            </button>
          </a>
      </section>
        <CouponSlider />

       

      <div className="trendingSection container-fluid">
        <section className="TrendingServices">
          <div className="container">
            <div className="text-container">
              <h2>Trending Services</h2>
              <span >
                {/* <p style={{color:"#fff"}}>Discover the latest trends in beauty and wellness with our exclusive range of services. Whether you’re looking to refresh your look or indulge in a luxurious treatment, we offer the hottest services that are making waves. Stay ahead of the curve and experience what’s trending, from cutting-edge hairstyles to rejuvenating skin therapies. Explore our top services today and transform your beauty routine with the best in the business.</p> */}

                <p style={{ color: "#fff" }}>
                  Discover a world of beauty and relaxation tailored just for you. At our beauty parlor, we redefine self-care with an exclusive range of services designed to make you look and feel your absolute best. Whether you're seeking a chic new hairstyle, a soothing spa day, or a complete makeover, we bring you the most sought-after treatments that combine luxury, innovation, and expertise.

                  Our highly trained professionals specialize in the latest trends in beauty and wellness, ensuring that every service is delivered with precision and care. From rejuvenating facials that leave your skin glowing, to advanced hair therapies that restore vitality and shine, we stay ahead of the curve to offer you nothing but the best.

                  Experience the art of transformation with our signature treatments, customized to meet your unique needs. Indulge in the ultimate pampering session in a serene, woman-friendly environment where your comfort and privacy are our top priority. Whether it's a special occasion or a well-deserved treat, our services are designed to enhance your natural beauty and boost your confidence.

                  Join the many women who trust us to elevate their beauty routine.
                </p>

              </span>
              <button className="cta-button">Explore More</button>
            </div>
            <div className="slider-container">
              <Slider {...sliderSettings}>
                {trendingServices.map((service, index) => (
                  <div key={index} className="slider-item">
                    <div className="slider-content">
                      <div className="service-image" style={{ backgroundImage: `url(${service.tImage})` }}></div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <button className="slider-btn">Learn More</button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </div>

      {/* <Deals /> */}
      <div id="deals-section">
        <Deals />
      </div>


      {/* <section className="info-section">
        <div className="info-container">
          <div className="info-text">
            <h2>Our Special Services</h2>
            <p>Discover the finest beauty treatments with our expert professionals. Whether it's skincare, hair care, or special spa packages, we provide personalized services that make you feel beautiful inside and out.</p>
            <a href="#" className="cta-button">Learn More</a>
          </div>
          <div className="info-media"> */}
      {/* Example with an image */}
      {/* <img src="your-image.jpg" alt="Special Service" className="media-image" /> */}
      {/* <img style={{height:"400px"}} src={image1} alt="Special Service" className="media-image" /> */}

      {/* Or use a video instead */}
      {/* <video class="media-video" controls>
            <source src="your-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video> */}
      {/* </div>
        </div>
      </section> */}

      {/* <deals /> */}
      <WorkViewSlider />


      <section className="double-image-section">
        <div className="double-image-container">
          <div className="image-group">
            <img src={nImage4} alt="Service 1" className="side-image" />
            <img src={nImage5} alt="Service 2" className="side-image" />
          </div>
          <div className="description">
            <h2>Why Choose Us?</h2>
            <p>
              Experience a harmonious blend of luxury and professionalism. Our team
              is dedicated to ensuring you receive the highest quality services
              tailored to your needs. With state-of-the-art facilities and a passion
              for beauty, we transform your vision into reality.
            </p>
            <a onClick={() => navigate("/about")} style={{ cursor: "pointer" }} className="cta-button">Explore More</a>
          </div>
        </div>
      </section>




      {/* <CustomerReviewSlider /> */}




      <div>

      </div>

      {/* <div className={"EShopLayout "}>
        <div className={"row mx-0"}>
          <div
            className={
              "col-lg-2 px-0 d-none d-md-none d-lg-block position-sticky top-0"
            }
          >
            <div>
              <div className={"EShopSideBar bg-white py-4 px-3 "}>
                <div className="mb-4">
                  <button
                    className="w-full px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out flex items-center justify-center"
                    onClick={handleReset}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Clear Filter
                  </button>
                </div>
                <h3 className="text-center pb-4">Catagories</h3>
                <Accordion key={accordionKey} defaultActiveKey="0">
                  {categoriesWithSub.map((category) => (
                    <Accordion.Item
                      key={category.id}
                      eventKey={category.id.toString()}
                    >
                      <Accordion.Header
                        onClick={() => handleCategoryClick(category)}
                      >
                        <div className={"d-flex align-items-center gap-2"}>
                          <CiApple />
                          <span>{category.name}</span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className={"py-0"}>
                        <ul className={"list-unstyled mb-0"}>
                          {category.subCategories.map((subCategory, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleSubCategoryClick(subCategory)
                              }
                              className={`${
                                selectedSubCategory === subCategory.id
                                  ? "text-danger"
                                  : null
                              }`}
                            >
                              {subCategory.name}
                            </li>
                          ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>

          <div id="productList" className={"col-lg-10 p-4"}>
            <div>
              <ProductList searchedProduct={searchedProduct} />
            </div>
          </div>
        </div>
      </div> */}


<div className="floating-buttons">
  <a
    href="https://wa.me/+923091113535"
    className="floating-btn whatsapp"
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => {
      e.preventDefault();
      window.open("https://wa.me/+923091113535", "_blank");
    }}
  >
    <IoLogoWhatsapp />
    <span className="number">WHATSAPP NOW</span>
  </a>
  <a
    href="tel:+923091113535"
    className="floating-btn phone"
    onClick={(e) => {
      if (!navigator.userAgent.match(/Mobi/i)) {
        e.preventDefault();
        alert("Calling is only available on mobile devices.");
      }
    }}
  >
    <IoCall />
    <span className="number">REQUEST CALL BACK</span>
  </a>
</div>

      <FooterParlor />

    </>
  );
}

export default Home;
