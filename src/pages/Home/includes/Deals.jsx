import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

import Slider from "react-slick";
import offer1 from "../../../assets/images/offer-1.webp";
import offer2 from "../../../assets/images/offer-2.webp";
import offer3 from "../../../assets/images/offer-3.webp";
import offer4 from "../../../assets/images/offer-4.webp";
import offer5 from "../../../assets/images/offer-5.webp";

import serviceImage1 from "../../../assets/images/service-image1.jpeg";
import serviceImage2 from "../../../assets/images/service-image2.jpeg";
import serviceImage3 from "../../../assets/images/service-image3.jpeg";
import serviceImage4 from "../../../assets/images/service-image4.jpeg";
import serviceImage5 from "../../../assets/images/service-image5.jpeg";
import serviceImage6 from "../../../assets/images/home-image3.jpg";
import serviceImage7 from "../../../assets/images/home-image2.jpg";
import serviceImage8 from "../../../assets/images/home-image1.jpg";
import serviceImage9 from "../../../assets/images/service-image6.webp";
import serviceImage10 from "../../../assets/images/service-image10.jpg";
import "../../../styles/CouponSlider.scss";
import { base_url } from "./../../../api/backend.js"




function Deals(props) {

  // const baseURL = "http://localhost:7001/uploads"
  // const baseURL = "https://be.beautyserviceathome.com/uploads"
  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
  const { allDeals } = useSelector((state) => state.ProductReducers);

  const navigate = useNavigate();

  useEffect(() => {

    console.log(allDeals, 'All deals');
    
  }, [allDeals]);



  const handleViewDetails = (id) => {
    // You can navigate to the service details page and pass the id
    navigate(`/deal-details/${id}`);
  };


  var settings = {
    dots: false,
    infinite: false,

    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
 

  return (


    <section className="Services">
    <div className="container">
      <h2 className="section-title">Our Deals</h2>
      <p className="section-subtitle">
        Experience the best in beauty and relaxation.
      </p>
      <div className="row">
      {allDeals && allDeals.length > 0 &&
  allDeals
    .slice(0, 4) // Get the latest 4 deals
    .map((deal) => (
      <div className="col-md-3 col-sm-6" key={deal.id}>
        <div className="service-card">
          <img
            src={base_url + deal.image}
            alt={deal.deal_name}
            className="service-image"
          />
          <h3>{deal.deal_name}</h3>
          <h5>Rs {deal.deal_price}</h5>
          <button
            className="viewMore"
            onClick={() => handleViewDetails(deal.id)}
          >
            View
          </button>
        </div>
      </div>
    ))
}

</div>

    </div>
  </section>
  



  );

}

export default Deals;
