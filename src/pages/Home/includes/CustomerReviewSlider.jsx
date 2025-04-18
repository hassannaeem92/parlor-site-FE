import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import offer1 from "../../../assets/images/offer-1.webp";
import offer2 from "../../../assets/images/offer-2.webp";
import offer3 from "../../../assets/images/offer-3.webp";
import offer4 from "../../../assets/images/offer-4.webp";
import offer5 from "../../../assets/images/offer-5.webp";
import "../../../styles/customerReviewSlider.scss";


function CustomerReviewSlider(props) {
    const reviews = [
        {
          name: "RimSha",
          review: "Amazing service! Highly recommend to anyone looking for quality.",
        },
        {
          name: "Mehvish",
          review: "Great experience! The team was professional and helpful.",
        },
        {
          name: "Hina Butt",
          review: "Quick and efficient. Exceeded my expectations!",
        },
        {
          name: "Muskan",
          review: "Excellent work! Will definitely come back.",
        },
        {
          name: "Neha",
          review: "Loved the attention to detail. A job well done!",
        },
      ];
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };
    
      return (
        <section className="customer-response-section">
          <div className="banner-container">
            <div className="banner-text">
              <h2>Customer Response</h2>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-content">
                    <p className="review-text">"{review.review}"</p>
                    <h4 className="review-author">- {review.name}</h4>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      );
    };

    const SampleNextArrow = (props) => {
        const { className, onClick } = props;
        return <div className={`${className} custom-arrow next`} onClick={onClick} />;
      };
      
      const SamplePrevArrow = (props) => {
        const { className, onClick } = props;
        return <div className={`${className} custom-arrow prev`} onClick={onClick} />;
      };


export default CustomerReviewSlider;
