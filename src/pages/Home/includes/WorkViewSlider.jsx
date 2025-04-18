import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import offer1 from "../../../assets/images/offer-1.webp";
import offer2 from "../../../assets/images/offer-2.webp";
import offer3 from "../../../assets/images/offer-3.webp";
import offer4 from "../../../assets/images/offer-4.webp";
import offer5 from "../../../assets/images/offer-5.webp";
import image1 from "../../../assets/images/work-slider-img1.jpg";
import image2 from "../../../assets/images/work-slider-img2.jpg";
import image3 from "../../../assets/images/work-slider-img3.jpg";
import image4 from "../../../assets/images/work-slider-img4.jpg";
import image5 from "../../../assets/images/work-slider-img5.jpg";
import image6 from "../../../assets/images/work-slider-img6.jpg";
import image7 from "../../../assets/images/work-slider-img7.jpg";
import image8 from "../../../assets/images/work-slider-img8.jpg";
import image9 from "../../../assets/images/work-slider-img9.jpg";
import { base_url } from "../../../api/backend";

import "../../../styles/workViewSlider.scss";
import { useSelector } from "react-redux";



function WorkViewSlider(props) {
  // const baseURL = "http://localhost:7001/uploads"
  const { workSectionImages } = useSelector((state) => state.ProductReducers);

  useEffect(() => {
    
    console.log(workSectionImages, 'categoriesWithSub');
    
    

  }, [workSectionImages]);


    const reviews = [
      {
        image: image1 // Add image URL here
      },
      {
        image: image2, // Add image URL here
      },
      {
        image: image3, // Add image URL here
      },
      {
        image: image4, // Add image URL here
      },
      {
        image: image5, // Add image URL here
      },
      {
        image: image6, // Add image URL here
      },
    
      {
        image: image7, // Add image URL here
      },
      {
        image: image8, // Add image URL here
      },
    
      {
        image: image9, // Add image URL here
      },
    
    

    ];
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4, // Show 4 slides at a time
      slidesToScroll: 1,
      autoplay: true, // Enable auto play
      autoplaySpeed: 2000, // Set the speed of auto slide (2 seconds)
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3, // Show 3 slides on medium screens
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2, // Show 2 slides on small screens
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1, // Show 1 slide on very small screens
          },
        },
      ],
    };
  
    return (
      <section className="work-section">
        <div className="banner-container-work">
          <div className="banner-text-work">
            <h2>Our Work</h2>
          </div>
        </div>
      
        <div className="slider-container">
          <Slider {...settings}>
            {workSectionImages.map((review, index) => (
              <div key={index} className="review-card-work">
                <img
                  src={`${base_url}${review.imagePath}`} // Concatenating base URL with imagePath
                  alt={`work-${index}`}
                  className="review-image"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
  
  

export default WorkViewSlider;
