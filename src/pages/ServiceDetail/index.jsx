import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { getSpecificServiceDetails } from "../../store/AsynMethod/ServiceMethod";
import '../../styles/ServiceDetails.scss';
import massageImage from '../../assets/images/masaag-image1.jpg'; // Replace with your image path
import { useParams } from "react-router-dom";
import { getCategoriesWithSubCategories, getServicePrices } from "../../store/AsynMethod/ProductMethod";
import { base_url } from "../../api/backend";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { bookAppointment } from "../../store/AsynMethod/ContactMethod";
import badge1 from "../../assets/images/badge1.png";
import badge2 from "../../assets/images/badge2.png";
import badge3 from "../../assets/images/badge3.png";
import badge4 from "../../assets/images/badge4.png";



const ServiceDetails = () => {

  // const baseURL = "http://localhost:7001/uploads"
  // const baseURL = "https://be.beautyserviceathome.com/uploads"
  const { id } = useParams();
  const dispatch = useDispatch();
  const { specificservice } = useSelector((state) => state.ServiceReducers);
  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
  const [specificCategory, setSpecificCategory] = useState({});
  useEffect(() => {


    const body = {
      serviceid: Number(id)
    }
    dispatch(getCategoriesWithSubCategories(body));
    dispatch(getSpecificServiceDetails(body));

  }, [id]);

  useEffect(() => {
    if (categoriesWithSub && categoriesWithSub.length > 0) {

      setSpecificCategory(categoriesWithSub.find((item) => item.id == id) || {});
      console.log(specificCategory);
    }
    if (specificservice) {
      console.log(specificservice);

    }


  }, [categoriesWithSub, id, specificservice]);


  const saveBooking = (formData, selectedService = null) => {
    
    console.log("Saving booking with the following data:");
    console.log("Form Data:", formData);
    if (selectedService) {
      console.log("Selected Service:", selectedService);
    }
    // Replace with your actual API call or logic
    /*
    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, service: selectedService }),
    })
      .then(response => response.json())
      .then(data => console.log('Booking saved:', data))
      .catch(error => console.error('Error saving booking:', error));
    */
  };


  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      message: '',
      captcha: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be numeric')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required'),
      // message: Yup.string().required('Message is required'),
      
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      
      
      const body = {
        name: values.name || '',
        phoneNumber: values.phoneNumber || '',
        message: values.message || '',
        serviceId: id,
      };

      dispatch(bookAppointment(body)).then((success) =>
              success ? formik.resetForm() : "",
            toast.success('booked Successfully')
      );


      // saveBooking(values, selectedService);
      // alert('Appointment request submitted successfully!');
      // resetForm();
      // setSelectedService(null); // Clear selected service after submission
      // setSubmitting(false);
    },
  });


  return (
    <>
      <div className="massage-details">
        {/* Hero Section */}
        <div className="hero-section">
          <img src={base_url + (specificCategory ? specificCategory.imagePath : massageImage)} alt="Massage Service" className="hero-image" />
          <div className="hero-overlay">
            {/* <h1 className="hero-title">{specificCategory ? specificCategory.name : 'Relax, Rejuvenate, and Renew'}</h1>
          <p style={{ color: "#c4c1c1" }} className="hero-subtitle">{specificCategory ? specificCategory.description : 'Professional massage services designed exclusively for women.'}</p> */}
            <h1 className="hero-title">{specificCategory ? specificCategory.name : 'Relax, Rejuvenate, and Renew'}</h1>

          </div>
        </div>

        {/* Service Overview */}
        {/* <section className="service-overview">
            <h2>About Our Massage Service</h2>
            <p>
              At our wellness center, we believe that every woman deserves a moment of tranquility. 
              Our massage services are crafted to provide ultimate relaxation, improve circulation, and 
              reduce stress. Whether you're seeking relief from a hectic lifestyle or just need a moment of calm, 
              our skilled therapists are here to ensure an unforgettable experience.
            </p>
            <p>
              Our professional team is trained in various techniques to cater to your specific needs. We maintain 
              the highest standards of hygiene, comfort, and privacy to ensure your experience is safe and serene.
            </p>
          </section> */}

        {/* Image and Description */}
        <section className="image-description">
          <div className="description-content">
            <h3 style={{ textAlign: 'center' }}>{specificCategory ? specificCategory.description : 'Relax, Rejuvenate, and Renew'}</h3>
            {/* <p style={{ textAlign: 'center' }}>
              Our certified and experienced therapists are dedicated to your relaxation, providing a calm and soothing ambiance crafted for your comfort. Using premium-quality oils and products, we offer customized massage options—ranging from gentle Swedish to invigorating deep tissue—tailored to your unique needs. Our goal is to help you unwind, release stress, and leave feeling renewed and revitalized.
            </p> */}

            <p style={{ textAlign: 'center' }}>
              {specificCategory ? specificCategory.description2 : 'Our certified and experienced therapists are dedicated to your relaxation, providing a calm and soothing ambiance crafted for your comfort. Using premium-quality oils and products, we offer customized massage options—ranging from gentle Swedish to invigorating deep tissue—tailored to your unique needs. Our goal is to help you unwind, release stress, and leave feeling renewed and revitalized.'}
            </p>
          </div>
        </section>

        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
  <section className="image-badges-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="section-content" style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
      {/* Left Side: Smaller Image */}
      <div className="image-container" style={{ flex: '0 0 30%', paddingRight: '20px',}}>
        <img src={base_url + (specificCategory ? specificCategory.imagePath : massageImage)} alt="Spa Experience" style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '8px' }} />
      </div>

      {/* Right Side: Heading Card and Badges */}
      <div className="text-container" style={{ flex: '1' }}>
        {/* Heading Card */}
        <div className="heading-card" style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <h3 style={{ margin: '0', textAlign: 'left', fontSize: '30px' }}>Book Service at home - Your Privicy is our priority</h3>

        <div className="button-container mt-4" style={{ textAlign: 'left', marginBottom: '15px' }}>
          <a href="https://wa.me/+923091113535" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '5px', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }}>
              Get Appointment Now
            </button>
          </a>
        </div>
     
        </div>

        {/* Badges Section - In a Row with Images and Slogans */}
        <div className="badges-container" style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'space-between' }}>
          <div className="badge-card" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={badge1} alt="Certified Icon" style={{ width: '80px', height: '80px', marginBottom: '5px' }} />
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Import Product</p>
          </div>
          <div className="badge-card" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={badge2} alt="Premium Icon" style={{ width: '80px', height: '80px', marginBottom: '5px' }} />
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Salon at Home</p>
          </div>
          <div className="badge-card" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={badge3} alt="Custom Icon" style={{ width: '80px', height: '80px', marginBottom: '5px' }} />
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Save Time</p>
          </div>
          <div className="badge-card" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={badge4} alt="Relax Icon" style={{ width: '80px', height: '80px', marginBottom: '5px' }} />
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>100% Secure</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

        {/* Massage Types Table */}
        {/* <section className="massage-table-section">
            <h2>Massage Types and Rates</h2>
            <table className="massage-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Rate (PKR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Full Body Massage</td>
                  <td>60 Minutes</td>
                  <td>4000</td>
                </tr>
                <tr>
                  <td>Full Body Massage with Hot Oil</td>
                  <td>60 Minutes</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>Full Body Massage</td>
                  <td>90 Minutes</td>
                  <td>7000</td>
                </tr>
              </tbody>
            </table>
          </section> */}

        <section className="massage-table-section">
          <h2>{specificCategory ? specificCategory.description : 'Relax, Rejuvenate, and Renew'}</h2>
          {/* <h2>Massage Types and Rates</h2> */}
          <table className="massage-table">
            <thead>
              <tr>
                <th>Types</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {specificservice?.length > 0 ? (
                specificservice.map((service, index) => (
                  <tr key={index}> {/* Adding a unique key */}

                    <td>{service.sub_service_name}</td>
                    <td>{JSON.stringify(service.price)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No subcategories available</td> {/* Fallback message */}
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Call-to-Action */}
        {/* <div className="massage-cta">
          <p>Ready to experience ultimate relaxation?</p>
          <button className="btn book-btn">Book Appointment</button>
        </div> */}
      </div>


      {/* <section className="appointment-form-section">
  <div className="form-image">
    <img
      style={{ width: "130%", height: "320px" }}
       src={base_url + (specificCategory ? specificCategory.imagePath : massageImage)} // Replace with the actual image path
      alt="Therapist"
      className="therapist-image"
    />
  </div>

  <div className="form-content" style={{ marginLeft: "290px" }} >
    <h2>Request an Appointment</h2>
    <Formik
      initialValues={{
        name: '',
        phone: '',
        message: '',
        captcha: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required'),
        phone: Yup.string()
          .matches(/^[0-9]+$/, 'Phone number must be numeric')
          .min(10, 'Phone number must be at least 10 digits')
          .required('Phone number is required'),
        message: Yup.string().required('Message is required'),
        captcha: Yup.boolean().oneOf([true], 'Please verify you are not a robot'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        saveBooking(values, selectedService);

        alert('Appointment request submitted successfully!');
        resetForm();
        setSelectedService(null); 
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <Field
              name="name"
              type="text"
              placeholder="Your Name"
              className="form-input"
            />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <Field
              name="phone"
              type="text"
              placeholder="Your Phone Number"
              className="form-input"
            />
            <ErrorMessage name="phone" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <Field
              name="message"
              as="textarea"
              placeholder="Your Message..."
              className="form-textarea"
            />
            <ErrorMessage name="message" component="div" className="error-message" />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
</section> */}


<section className="appointment-form-section">
        {/* Left Side: Image */}
        <div className="form-image">
          <img
            src={base_url + (specificCategory ? specificCategory.imagePath : massageImage)} // Replace with the actual image path
            alt="Therapist"
            className="therapist-image"
            onError={() => console.log("Image failed to load")}
          />
        </div>

        {/* Right Side: Form */}
        <div className="form-content">
          <h2>Request an Appointment</h2>
       
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="Your Name"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="error-message" style={{ color: 'red' }}>
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="Your Phone Number"
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <div className="error-message" style={{ color: 'red' }}>
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                className="form-control"
                placeholder="Your Message..."
                rows="4"
              />
              {formik.errors.message && formik.touched.message && (
                <div className="error-message" style={{ color: 'red' }}>
                  {formik.errors.message}
                </div>
              )}
            </div>

            {/* <div className="form-group captcha-group">
              <label>
                <input
                  type="checkbox"
                  name="captcha"
                  checked={formik.values.captcha}
                  onChange={formik.handleChange}
                />
                I'm not a robot
              </label>
              <span className="recaptcha-badge">reCAPTCHA</span>
              {formik.errors.captcha && formik.touched.captcha && (
                <div className="error-message" style={{ color: 'red' }}>
                  {formik.errors.captcha}
                </div>
              )}
            </div> */}

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

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
};

export default ServiceDetails;
