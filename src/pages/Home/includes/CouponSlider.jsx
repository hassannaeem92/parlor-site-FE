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
import { base_url } from "../../../api/backend";





function CouponSlider(props) {
  
  // const baseURL = "http://localhost:7001/uploads"
  // const baseURL = "https://be.beautyserviceathome.com/uploads"
  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
  const { products } = useSelector((state) => state.ProductReducers);
  const navigate = useNavigate();

  useEffect(() => {
    
    console.log(categoriesWithSub, 'categoriesWithSub');
    products
    

  }, [categoriesWithSub, products]);



  const handleViewDetails = (id) => {
    // You can navigate to the service details page and pass the id
    navigate(`/service-details/${id}`);
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
    // <div className={"CouponSlider py-4"}>
    //   <div className={"container-fluid px-4"}>
    //     <Slider className={"CouponSliderInner"} {...settings}>
    //       <div className={"p-2"}>
    //         <img className={"img-fluid"} src={offer1} />
    //       </div>
    //       <div className={"p-2"}>
    //         <img className={"img-fluid"} src={offer2} />
    //       </div>
    //       <div className={"p-2"}>
    //         <img className={"img-fluid"} src={offer3} />
    //       </div>
    //       <div className={"p-2"}>
    //         <img className={"img-fluid"} src={offer4} />
    //       </div>
    //       <div className={"p-2"}>
    //         <img className={"img-fluid"} src={offer5} />
    //       </div>
    //     </Slider>
    //   </div>
    // </div>


    // NEw code start here

    // <section className="Services">
    //   <div className="container">
    //     <h2 className="section-title">Our Services</h2>
    //     <p className="section-subtitle">
    //       Experience the best in beauty and relaxation.
    //     </p>
    //     <div className="row">
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-cut"></i>
    //           <h3>Hair Cutting</h3>
    //           <p>Expert haircuts for men and women.</p>
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-paint-brush"></i>
    //           <h3>Hair Coloring</h3>
    //           <p>Transform your look with our professional coloring services.</p>
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-spa"></i>
    //           <h3>Hair Spa</h3>
    //           <p>Indulge in a relaxing and rejuvenating hair spa treatment.</p>
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-makeup"></i>
    //           <h3>Makeup</h3>
    //           <p>Professional makeup application for any occasion.</p>
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-hands-helping"></i>
    //           <h3>Manicure</h3>
    //           <p>Pamper your hands with a luxurious manicure.</p>
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-foot-print"></i>
    //           <h3>Pedicure</h3>
    //           <p>Relax and rejuvenate your feet with a soothing pedicure.</p>
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-spa"></i>
    //           <h3>Facial</h3>
    //           <p>Experience a revitalizing facial treatment for glowing skin.</p>
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <i className="fas fa-massage"></i>
    //           <h3>Massage</h3>
    //           <p>Indulge in a relaxing massage to relieve stress and tension.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // New One COnnetnt important 
    //     <section className="Services">
    //   <div className="container">
    //     <h2 className="section-title">Our Services</h2>
    //     <p className="section-subtitle">
    //       Experience the best in beauty and relaxation.
    //     </p>
    //     <div className="row">
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage8} alt="Hair Cutting" className="service-image" />
    //           <h3>Hair Cutting</h3>
    //           <p>Expert haircuts for men and women.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore"><Link to={"/service-details"}>View</Link></button> */}
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage6} alt="Hair Coloring" className="service-image" />
    //           <h3>Hair Coloring</h3>
    //           <p>Transform your look with our professional coloring services.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore">View</button> */}
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage10} alt="Hair Spa" className="service-image" />
    //           <h3>Hair Spa</h3>
    //           <p>Indulge in a relaxing and rejuvenating hair spa treatment.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore">View</button> */}
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage7} alt="Makeup" className="service-image" />
    //           <h3>Makeup</h3>
    //           <p>Professional makeup application for any occasion.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore">View</button> */}
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage5} alt="Manicure" className="service-image" />
    //           <h3>Manicure</h3>
    //           <p>Pamper your hands with a luxurious manicure.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore">View</button> */}
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage9} alt="Pedicure" className="service-image" />
    //           <h3>Pedicure</h3>
    //           <p>Relax and rejuvenate your feet with a soothing pedicure.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore">View</button> */}
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage1} alt="Facial" className="service-image" />
    //           <h3>Facial</h3>
    //           <p>Experience a revitalizing facial treatment for glowing skin.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore">View</button> */}
    //         </div>
    //       </div>
    //       <div className="col-md-3 col-sm-6">
    //         <div className="service-card">
    //           <img src={serviceImage3} alt="Massage" className="service-image" />
    //           <h3>Massage</h3>
    //           <p>Indulge in a relaxing massage to relieve stress and tension.</p>
    //           <button className="viewMore"><Link to={"/service-details"}>View</Link></button>
    //           {/* <button className="viewMore">View</button> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>


    <section className="Services">
      <div className="container">
        <p className="section-subtitle container">
          {/* Experience the best in beauty and relaxation. */}
          Stop worrying about commuting to salons and enjoy the luxurious beauty treatments at your home! We are offering professional and the most luxurious salon services at the comfort of your own. Being the masters of our industry, we have established our name by providing excellent at-home salon services. Our services are offered with utmost focus on comfort, so you can enjoy the salon-grade experience at your home. We are the leading at-home beauty services, designed to help women pamper themselves even if they have time and commuting constraints. Our team of vetted and professional beauticians has already helped thousands of women in feeling and looking amazing, and we would love to help you the same with our salon services at home.
        </p>
        <h2 className="section-title">Our Services</h2>

        <div className="row">
          {categoriesWithSub.map((category) => (
            <div className="col-md-3 col-sm-6" key={category.id}>
              <div className="service-card">
               <h3>{category.name}</h3>
                <img
                  src={base_url + category.imagePath}
                  alt={category.name}
                  // alt={category.service_name}
                  className="service-image"
                />
                <h3>{category.service_name}</h3>
                <p>{category.description}</p>
                {/* <p>{category.description || "Experience unparalleled care and indulgence with our expert services. Let us help you look and feel your best"}</p> */}
                <button
                  className="viewMore"
                  onClick={() => handleViewDetails(category.id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



  );
}

export default CouponSlider;
