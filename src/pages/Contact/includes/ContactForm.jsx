import React, { useEffect, useState } from "react";
import "../../../styles/contactForm.scss";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../../../store/AsynMethod/ContactMethod";
import contactImage from "../../../assets/images/contact-us.jpeg";
import { getCategoriesWithSubCategories } from "../../../store/AsynMethod/ProductMethod";
import { toast } from "react-toastify";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";

const center = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude
};

const containerStyle = {
  width: "100%",
  height: "300px",
};

function ContactForm(props) {
  const { categoriesWithSub } = useSelector((state) => state.ProductReducers);
  const { user } = useSelector((state) => state.AuthReducers);
  const dispatch = useDispatch();


  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(newLocation);
        setMarkerPosition(newLocation);
      }
    }
  };

  const handleMapClick = (e) => {
    setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };


   useEffect(() => {
      dispatch(getCategoriesWithSubCategories());
    }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      serviceid: "",
      description: "",
      address: "",
      appointmentDate: "",
      appointmentTime: "",
      phoneNumber: "",
      numberOfPersons: "",
      createdBy: user?.id,
      createdAt: new Date().toISOString().slice(0, 10),
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
    
      serviceid: Yup.string().required("Service ID required"),
      
      // description: Yup.string().required("Description required"),
      
      address: Yup.string().required("Address required"),
      
      appointmentDate: Yup.date()
        .required("Appointment date required")
        .nullable()
        .typeError('Invalid date format'),
        
      appointmentTime: Yup.string().required("Appointment time required"),
      
      phoneNumber: Yup.string()
        .required("Phone number required")
        .matches(/^[0-9]{10,13}$/, "Phone number must be between 10 and 13 digits"),
      
      numberOfPersons: Yup.number()
        .required("Number of persons required")
        .positive("Number of persons must be positive")
        .integer("Number of persons must be an integer")
        .min(1, "Number of persons must be at least 1"),
    }),
    onSubmit: (data) => {
      

      const body = {
        name: data.name || '', 
        phoneNumber: data.phoneNumber || '', 
        description: data.description || '', 
        appointmentDate: data.appointmentDate ? formatDateTime(data.appointmentDate) : null, 
        address: data.address || '', 
        serviceid: data.serviceid || '', 
        appointmentTime: data.appointmentTime ? formatTime(data.appointmentTime) : null, 
        numberOfPersons: data.numberOfPersons || 0, 
        createdBy: user?.id || null, 
        createdAt: new Date().toISOString().slice(0, 10),
    }
    

      dispatch(addContact(body)).then((success) =>
        success ? formik.resetForm() : "",
      toast.success('booked Successfully')
    );
  },
  });

  const handleSelect = (eventKey) => {
    alert(`You selected: ${eventKey}`);
  };

  const formatTime = (time) => {
    // Split the time into hours and minutes
    const timeParts = time.split(':');
  
    // If time only has hours and minutes, append seconds as "00"
    if (timeParts.length === 2) {
        return `${timeParts[0]}:${timeParts[1]}:00`;
    }
  
    // If time already has hours, minutes, and seconds, return as is
    return time;
}
  const formatDateTime = (date) => {
    if (!date) return null;
    const formattedDate = new Date(date);
  
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const hours = String(formattedDate.getHours()).padStart(2, '0');
    const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
    const seconds = String(formattedDate.getSeconds()).padStart(2, '0');
    const milliseconds = formattedDate.getMilliseconds().toString().padStart(3, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

return (
<>  
  <div className="contact-page">
    {/* Header Section */}
    <header className="contact-header">
      <h1>Contact Us</h1>
      <p style={{ color: "#fff" }}>We’re here to help and answer any questions you might have.</p>
    </header>

    {/* Form and Card Section */}
    <section className="contact-main">
      {/* Form Section */}
      <div className="contact-form">
        <div className="form-card">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors?.name && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  className="form-control"
                  placeholder="Enter phone number"
                />
                {formik.errors?.phoneNumber && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.phoneNumber}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="serviceid">Service</label>
                <select
                  id="serviceid"
                  value={formik.values.serviceid}
                  onChange={formik.handleChange}
                  className="form-control"
                >
                  <option value="">Select a Service</option>
                  {categoriesWithSub?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.errors?.serviceid && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.serviceid}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">Complete Address</label>
                <input
                  id="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="form-control"
                />
                {formik.errors?.address && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.address}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="appointmentDate">Appointment Date</label>
                <input
                  id="appointmentDate"
                  type="date"
                  value={formik.values.appointmentDate}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors?.appointmentDate && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.appointmentDate}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="appointmentTime">Ready Time</label>
                <input
                  id="appointmentTime"
                  type="time"
                  value={formik.values.appointmentTime}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors?.appointmentTime && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.appointmentTime}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numberOfPersons">Number of Persons</label>
                <input
                  id="numberOfPersons"
                  type="number"
                  value={formik.values.numberOfPersons}
                  onChange={formik.handleChange}
                  className="form-control"
                  min="1"
                />
                {formik.errors?.numberOfPersons && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.numberOfPersons}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  className="form-control"
                  rows="4"
                />
                {formik.errors?.description && (
                  <div className="error-message" style={{ color: 'red' }}>{formik.errors?.description}</div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Card Section */}
      <div className="contact-card">
        <div className="image-placeholder">
          <img src={contactImage} alt="Card Image" className="card-img" />
        </div>
        <div className="card-content">
          <h3>Our Commitment</h3>
          <p>
            We are dedicated to providing exceptional service and ensuring
            your satisfaction. Feel free to reach out for appointments or
            inquiries.
          </p>
        </div>
      </div>
    </section>

    {/* Map Section */}
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={["places"]}>
      <section className="contact-map">
        <h2>Our Location</h2>

        {/* Autocomplete Search Box */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a location"
            className="form-control"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </Autocomplete>

        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </section>
    </LoadScript>
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

export default ContactForm;
