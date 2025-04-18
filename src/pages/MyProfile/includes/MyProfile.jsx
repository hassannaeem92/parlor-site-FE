import React, { useState, useEffect } from "react";
import "../../../styles/myProfile.scss";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { FiEdit2 } from "react-icons/fi";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import {
  getspecificUser,
  updateUser,
  updateUserPic,
} from "../../../store/AsynMethod/UserMethod.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "primereact/dropdown";
import backendValidUser from "../../../api/backendVerifiedUser.js";
import { Country, State, City } from "country-state-city";

function MyProfile(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducers);
  const { specificUser } = useSelector((state) => state.UserReducer);
  const countries = Country.getAllCountries();
  const [allStates, setStates] = useState([]);
  const [allCities, setCities] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const [path, setPath] = useState();
  console.log(`IMG name: ${specificUser?.image}`);

  useEffect(() => {
    dispatch(getspecificUser(user?.id));
  }, [dispatch, user?.id]);

  const handleFile = (e) => {
    console.log("File handled");
    setImgFile(e.target.files[0]);
  };

  const uploadFile = () => {
    console.log("File Upload started");
    const formData = new FormData();
    formData.append("img", imgFile);

    dispatch(updateUserPic(formData, user?.id)).then(() => {
      // After successful upload, update the path
      dispatch(getspecificUser(user?.id)).then((updatedUser) => {
        setPath(
          `https://be.nobleoilcentre.com/profile_pics/${updatedUser.image}`
        );
      });
    });
  };

  const handleExpiryDateChange = (e, handleChange) => {
    let { value } = e.target;

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    let formattedValue = "";

    if (value.length <= 2) {
      // Accept only the first two digits as month
      formattedValue = value;
    } else {
      // Extract month and year
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);

      // Validate month (01-12)
      if (parseInt(month, 10) > 0 && parseInt(month, 10) <= 12) {
        formattedValue = month;
      } else {
        formattedValue = "12"; // Default to December if invalid
      }

      // Append year if it has been entered
      if (year.length > 0) {
        formattedValue += `/${year}`;
      }
    }

    handleChange({
      target: {
        name: e.target.name,
        value: formattedValue,
      },
    });
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getspecificUser(user?.id));
    }
  }, [user?.id]);

  useEffect(() => {
    setPath(
      `https://be.nobleoilcentre.com/profile_pics/${specificUser?.image}`
    );
    console.log(path);
  }, [uploadFile, dispatch]);

  useEffect(() => {
    if (specificUser) {
      profileFormik.setValues({
        fname: specificUser?.name || "",
        lname: specificUser?.last_name || "",
        email: specificUser?.email || "",
        phone: specificUser?.phone || "",
        shipping_address1: specificUser?.shipping_address1 || "",
        billing_address1: specificUser?.billing_address1 || "",
        isActive: specificUser?.is_active || true,
        apt: specificUser?.apt || "",
        street: specificUser?.street || "",
        zip: specificUser?.zip_code || "",
        city: specificUser?.city || "",
        state: specificUser?.state || "",
        country: specificUser?.country || "",
        ccv: specificUser?.ccv || "",
        expiryDate: specificUser?.expire_date || "",
        cardName: specificUser?.card_name || "",
        cardNumber: specificUser?.card_number || "",
      });
    }
  }, [specificUser]);

  const profileFormik = useFormik({
    initialValues: {
      fname: specificUser?.name || "",
      lname: specificUser?.last_name || "",
      email: specificUser?.email || "",
      phone: specificUser?.phone || "",
      shipping_address1: specificUser?.shipping_address1 || "",
      billing_address1: specificUser?.billing_address1 || "",
      isActive: specificUser?.is_active || true,
      apt: specificUser?.apt || "",
      street: specificUser?.street || "",
      zip: specificUser?.zip_code || "",
      city: specificUser?.city || "",
      state: specificUser?.state || "",
      country: specificUser?.country || "",
      ccv: specificUser?.ccv || "",
      expiryDate: specificUser?.expire_date || "",
      cardName: specificUser?.card_name || "",
      cardNumber: specificUser?.card_number || "",
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("First Name is required"),
      lname: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone Number is required"),
      shipping_address1: Yup.string().required("Shipping Address is required"),
      billing_address1: Yup.string().required("Billing Address is required"),
    }),
    onSubmit: async (values) => {
      console.log(user?.id);
      dispatch(updateUser(values, user?.id));
    },
  });

  useEffect(() => {
    setStates(State.getStatesOfCountry(profileFormik.values.country));
  }, [profileFormik.values.country]);
  useEffect(() => {
    setCities(
      City.getCitiesOfState(
        profileFormik.values.country,
        profileFormik.values.state
      )
    );
    console.log("cities", allCities);
  }, [profileFormik.values.state]);

  return (
    specificUser && (
      <div className="container py-5">
        <form onSubmit={profileFormik.handleSubmit}>
          <div className="row mx-auto justify-content-center">
            <div className="col-lg-10 px-0">
              <div className="bg-light">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Row>
                    <Col sm={3} className="pe-0">
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Address</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">Payment Methods</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content className="tabContent">
                        <Tab.Pane eventKey="first">
                          <div className="row mx-0 py-5">
                            <div className="col-lg-12">
                              <div className="image-upload mb-4 text-center">
                                <div className="imageBox mx-auto justify-content-center align-items-center position-relative">
                                  {selectedImage ? (
                                    <img
                                      src={selectedImage}
                                      alt="Profile"
                                      className="uploaded-image"
                                    />
                                  ) : (
                                    <label
                                      htmlFor="fileInput"
                                      className="upload-label"
                                    >
                                      <Avatar
                                        color="grey"
                                        name={`${specificUser?.name}  ${specificUser?.last_name}`}
                                        size="100"
                                        round={true}
                                        src={path}
                                      />
                                      <span className="position-absolute icon">
                                        <FiEdit2 />
                                      </span>
                                    </label>
                                  )}
                                  <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleFile}
                                    className="d-none"
                                  />
                                </div>
                                <div className="text-center h6 pt-2">
                                  Upload Profile Picture
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">First Name</label>
                              <input
                                name="fname"
                                value={profileFormik.values.fname}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                type="text"
                                className={`form-control form-control-lg ${
                                  profileFormik.touched.fname &&
                                  profileFormik.errors.fname
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {profileFormik.touched.fname &&
                                profileFormik.errors.fname && (
                                  <div className="invalid-feedback">
                                    {profileFormik.errors.fname}
                                  </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Last Name</label>
                              <input
                                name="lname"
                                value={profileFormik.values.lname}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                type="text"
                                className={`form-control form-control-lg ${
                                  profileFormik.touched.lname &&
                                  profileFormik.errors.lname
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {profileFormik.touched.lname &&
                                profileFormik.errors.lname && (
                                  <div className="invalid-feedback">
                                    {profileFormik.errors.lname}
                                  </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Email</label>
                              <input
                                name="email"
                                value={profileFormik.values.email}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                type="email"
                                className={`form-control form-control-lg ${
                                  profileFormik.touched.email &&
                                  profileFormik.errors.email
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {profileFormik.touched.email &&
                                profileFormik.errors.email && (
                                  <div className="invalid-feedback">
                                    {profileFormik.errors.email}
                                  </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Phone Number</label>
                              <input
                                name="phone"
                                value={profileFormik.values.phone}
                                onChange={profileFormik.handleChange}
                                onBlur={profileFormik.handleBlur}
                                type="text"
                                className={`form-control form-control-lg ${
                                  profileFormik.touched.phone &&
                                  profileFormik.errors.phone
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {profileFormik.touched.phone &&
                                profileFormik.errors.phone && (
                                  <div className="invalid-feedback">
                                    {profileFormik.errors.phone}
                                  </div>
                                )}
                            </div>
                            <div className="col-lg-6 mb-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Shipping Address
                                </label>
                                <textarea
                                  name="shipping_address1"
                                  value={profileFormik.values.shipping_address1}
                                  onChange={profileFormik.handleChange}
                                  onBlur={profileFormik.handleBlur}
                                  className={`form-control form-control-lg ${
                                    profileFormik.touched.shipping_address1 &&
                                    profileFormik.errors.shipping_address1
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  rows="3"
                                ></textarea>
                                {profileFormik.touched.shipping_address1 &&
                                  profileFormik.errors.shipping_address1 && (
                                    <div className="invalid-feedback">
                                      {profileFormik.errors.shipping_address1}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Billing Address
                                </label>
                                <textarea
                                  name="billing_address1"
                                  value={profileFormik.values.billing_address1}
                                  onChange={profileFormik.handleChange}
                                  onBlur={profileFormik.handleBlur}
                                  className={`form-control form-control-lg ${
                                    profileFormik.touched.billing_address1 &&
                                    profileFormik.errors.billing_address1
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  rows="3"
                                ></textarea>
                                {profileFormik.touched.billing_address1 &&
                                  profileFormik.errors.billing_address1 && (
                                    <div className="invalid-feedback">
                                      {profileFormik.errors.billing_address1}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                              <button
                                type="submit"
                                className="btn"
                                disabled={profileFormik.isSubmitting}
                                onClick={uploadFile}
                              >
                                {profileFormik.isSubmitting
                                  ? "Updating..."
                                  : "Update Profile"}
                              </button>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="row mx-0 pt-5 pb-3">
                            <div className="col-lg-12">
                              <div className="text-end"></div>
                            </div>
                          </div>

                          <div className="row mx-0 pb-3">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                House / Apartment
                              </label>
                              <input
                                type="text"
                                name={`apt`}
                                onChange={profileFormik.handleChange}
                                value={profileFormik.values.apt}
                                className="form-control form-control-lg"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Street</label>
                              <input
                                type="text"
                                name={`street`}
                                value={profileFormik.values.street}
                                onChange={profileFormik.handleChange}
                                className="form-control form-control-lg"
                              />
                            </div>
                            <div className="px-4 gap-4 grid grid-cols-1 lg:grid-cols-2">
                              <div className="">
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="country" className="">
                                    Select Country
                                  </label>
                                  <Dropdown
                                    placeholder="Select"
                                    id="country"
                                    name="country"
                                    className="!w-full text-lg p-primary-input"
                                    value={profileFormik.values.country}
                                    onChange={profileFormik.handleChange}
                                    options={countries}
                                    optionLabel="name"
                                    optionValue="isoCode"
                                    filter
                                    pt={{
                                      root: { className: "w-full" },
                                      input: {
                                        className: "w-full p-primary-input",
                                      },
                                      filterIcon: { className: "ml-1" },
                                      filterInput: { className: "pl-6" },
                                    }}
                                  />
                                </div>
                                {profileFormik.touched?.country &&
                                  profileFormik.errors?.country && (
                                    <div className="p-error">
                                      {profileFormik.errors?.country}
                                    </div>
                                  )}
                              </div>

                              <div className="">
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="state" className="">
                                    Select State
                                  </label>
                                  <Dropdown
                                    placeholder="Select"
                                    id="state"
                                    name="state"
                                    className="!w-full text-lg p-primary-input"
                                    value={profileFormik.values.state}
                                    onChange={profileFormik.handleChange}
                                    options={allStates}
                                    optionLabel="name"
                                    optionValue="isoCode"
                                    filter
                                    pt={{
                                      root: { className: "w-full" },
                                      input: {
                                        className: "w-full p-primary-input",
                                      },
                                      filterIcon: { className: "ml-1" },
                                      filterInput: { className: "pl-6" },
                                    }}
                                  />
                                </div>
                                {profileFormik.touched?.state &&
                                  profileFormik.errors?.state && (
                                    <div className="p-error">
                                      {profileFormik.errors?.state}
                                    </div>
                                  )}
                              </div>

                              <div className="">
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="city" className="">
                                    Select City
                                  </label>
                                  <Dropdown
                                    placeholder="Select"
                                    id="city"
                                    name="city"
                                    className="!w-full text-lg p-primary-input"
                                    value={profileFormik.values.city}
                                    onChange={profileFormik.handleChange}
                                    options={allCities}
                                    optionLabel="name"
                                    optionValue="name"
                                    filter
                                    pt={{
                                      root: { className: "w-full" },
                                      input: {
                                        className: "w-full p-primary-input",
                                      },
                                      filterIcon: { className: "ml-1" },
                                      filterInput: { className: "pl-6" },
                                    }}
                                  />
                                </div>
                                {profileFormik.touched?.city &&
                                  profileFormik.errors?.city && (
                                    <div className="p-error">
                                      {profileFormik.errors?.city}
                                    </div>
                                  )}
                              </div>
                              <div className="col-md-6 mb-3">
                                <label className="form-label">Zip Code</label>
                                <InputMask
                                  mask="99999"
                                  value={profileFormik.values.zip}
                                  onChange={profileFormik.handleChange}
                                  name="zip"
                                  className="form-control form-control-lg"
                                  maskChar={null}
                                  formatChars={{ 9: "[0-9]" }} // Ensures only digits are accepted
                                >
                                  {(inputProps) => (
                                    <input type="text" {...inputProps} />
                                  )}
                                </InputMask>
                              </div>
                            </div>

                            <div className="col-lg-12 mb-3"></div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <div className="row mx-0 pt-5 pb-2">
                            <div className="col-lg-12">
                              <div className="text-end"></div>
                            </div>
                          </div>

                          <div className="row mx-0 pb-5">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Card Name</label>
                              <input
                                type="text"
                                name={`cardName`}
                                value={profileFormik.values.cardName}
                                onChange={(e) => {
                                  const regex = /^[a-zA-Z\s]*$/;
                                  if (regex.test(e.target.value)) {
                                    profileFormik.handleChange(e);
                                  }
                                }}
                                className="form-control form-control-lg"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Card Number</label>
                              <InputMask
                                mask="9999-9999-9999-9999"
                                value={profileFormik.values.cardNumber}
                                onChange={profileFormik.handleChange}
                                name="cardNumber"
                                className="form-control form-control-lg"
                                maskChar={null}
                              >
                                {(inputProps) => (
                                  <input type="text" {...inputProps} />
                                )}
                              </InputMask>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">CVV</label>
                              <div className="input-group">
                                <input
                                  type={
                                    profileFormik.values.showCcv
                                      ? "text"
                                      : "password"
                                  }
                                  onChange={(e) => {
                                    // Only allow numbers and limit to 10 digits
                                    const regex = /^[0-9]{0,10}$/;
                                    if (regex.test(e.target.value)) {
                                      profileFormik.handleChange(e);
                                    }
                                  }}
                                  value={profileFormik.values.ccv}
                                  name={`ccv`}
                                  className="form-control form-control-lg"
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() =>
                                    profileFormik.setFieldValue(
                                      "showCcv",
                                      !profileFormik.values.showCcv
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={
                                      profileFormik.values.showCcv
                                        ? faEyeSlash
                                        : faEye
                                    }
                                  />
                                </button>
                              </div>
                              {profileFormik.errors.ccv && (
                                <div className="text-danger">
                                  {profileFormik.errors.ccv}
                                </div>
                              )}
                            </div>

                            <div className="col-md-6 mb-3">
                              <label className="form-label">
                                Date Of Expiry
                              </label>
                              <input
                                type="text"
                                name={`expiryDate`}
                                onChange={(e) =>
                                  handleExpiryDateChange(
                                    e,
                                    profileFormik.handleChange
                                  )
                                }
                                value={profileFormik.values.expiryDate}
                                className="form-control form-control-lg"
                                placeholder="MM/YY"
                              />
                              {profileFormik.errors.expiryDate && (
                                <div className="text-danger">
                                  {profileFormik.errors.expiryDate}
                                </div>
                              )}
                            </div>

                            <div className="col-lg-12 mb-3"></div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  );
}

export default MyProfile;
