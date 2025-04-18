import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "../../../styles/faqs.scss";
import { useSelector } from "react-redux";
import aboutImage from "../../../assets/images/about-page1.jpeg";
import nImage6 from "../../../assets/images/new-image6.jpeg";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import aboutImage2 from "../../../assets/images/about-image2.jpeg";

function FaqsSingle(props) {
  const { faqs } = useSelector((state) => state.InfoPageReducer);

  return (
    // <div>
    //   <div className={"singleFaqs py-5"}>
    //     <div className={"container"}>
    //       <Accordion defaultActiveKey="0">
    //         {faqs?.map((section, index) => (
    //           <Accordion.Item key={index} eventKey={index.toString()}>
    //             <Accordion.Header>{section.title}</Accordion.Header>
    //             <Accordion.Body>{section.content}</Accordion.Body>
    //           </Accordion.Item>
    //         ))}
    //       </Accordion>
    //     </div>
    //   </div>
    // </div>

    <>
<div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <div className="header-content">
          <h1>About Us</h1>
          <p style={{color: "#fff"}}>Discover who we are, what we do, and why we do it.</p>
        </div>
      </header>

      {/* First Section - Image and Description */}
      <section className="journey-section mt-5 container">
        <div className="journey-image">
          <img src={nImage6} alt="Beauty Parlor" />
          
        </div>
        <div className="journey-description">
          <h2>About Our Beauty Parlor</h2>
          <p>
            Welcome to our beauty parlor, where we offer a wide range of services 
            designed to make you feel relaxed and beautiful. Whether you're looking 
            for a rejuvenating facial, a trendy haircut, or a perfect makeup look, 
            our team of experts will ensure you leave looking your best.
          </p>
        </div>
      </section>

      {/* Second Section - Specialty and History */}
      <section className="specialty-section">
        <div className="specialty-container container">
        <div className="specialty-heading">
          <h3>Our Specialty</h3>
        </div>
        <div className="specialty-description">
          <p>
            We specialize in personalized beauty treatments tailored to your unique needs.
            From the latest in hairstyling trends to expert skincare solutions, we provide 
            services that enhance your natural beauty. Our team is dedicated to making sure 
            you feel pampered and leave with confidence.
          </p>
        </div>

        </div>
      </section>

      {/* Third Section - Our Journey with Two Columns */}
      <section className="journey-section container">
        <div className="journey-description">
          <h3>Our Journey</h3>
          <p>
            Our beauty parlor started with a vision to create a space where people can feel
            comfortable, cared for, and beautiful. Over the years, we've grown into a leading 
            beauty destination, and our mission remains the same: to make every client feel
            their best.
          </p>
        </div>
        <div className="journey-image">
          <img src={aboutImage2} alt="Our Journey" />

        </div>
      </section>
    </div>


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

</>
  );
}

export default FaqsSingle;
