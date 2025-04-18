import React, { useEffect, useState } from "react";
import "../styles/login.scss";
// import image from "../assets/images/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/AsynMethod/AuthMethod";
import { toast } from "react-toastify";
import { RESET_ERROR } from "../store/Types/AuthTypes";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.AuthReducers
  );

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: (data) => {
      let errors = {};
      if (data.email?.length === 0) {
        errors.email = "Email required.";
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email address.";
      }
      if (data.last_name?.length === 0) {
        errors.last_name = "Last Name Required.";
      }
      if (data.password?.length === 0) {
        errors.password = "Password Required.";
      } else if (data.password?.length < 8) {
        errors.password = "At least 8 character Password Required.";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit.";
      }
      if (data.name?.length === 0) {
        errors.name = "Name Required.";
      }

      if (data.cpassword?.length === 0) {
        errors.cpassword = "Confirm Password Required.";
      } else if (data.cpassword !== data.password) {
        errors.cpassword = "Password Not Matched.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      dispatch(userRegister(data)).then((success) => {
        if (success) {
          formik.resetForm();
          navigate("/login");
        }
      });
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error mb-1 ml-2" style={{ color: "#de622c" }}>
        {formik.errors[name]}
      </small>
    ) : (
      <small className="p-error">{""}</small>
    );
  };

  return (
    <div>
      <div
        className={"register d-flex align-items-center justify-content-center"}
      >
        <div className={"container"}>
          <div className={"row mx-auto justify-content-center"}>
            <div className={"col-md-6 col-lg-4 px-0"}>
              <div className={"bg-white px-4 pt-1 pb-4 rounded shadow"}>
                <div className={"text-center brand"}>
                  {/* <img src={image} /> */}
                  <div className={"py-3"}>
                    <h2 style={{ color: "#7e3f25" }}>Sign Up</h2>
                  </div>
                </div>
                <form className={"row mx-0"} onSubmit={formik.handleSubmit}>
                  <div className={"col-md-12 px-0"}>
                    <label className={"form-label mb-1"}>First Name</label>
                    <input
                      type={"text"}
                      className={"form-control form-control-lg"}
                      value={formik.values.name}
                      onChange={(e) =>
                        formik.setFieldValue("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-2">{getFormErrorMessage("name")}</div>
                  <div className="col-md-12 px-0">
                    <label className="form-label mb-1">Last Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={formik.values.last_name}
                      onChange={(e) =>
                        formik.setFieldValue("last_name", e.target.value)
                      }
                    />
                    <div className="mb-2">
                      {getFormErrorMessage("last_name")}
                    </div>
                  </div>
                  <div className="mb-2">{getFormErrorMessage("lname")}</div>
                  <div className={"col-md-12 px-0"}>
                    <label className={"form-label mb-1"}>Email</label>
                    <input
                      type={"email"}
                      className={"form-control form-control-lg"}
                      value={formik.values.email}
                      onChange={(e) =>
                        formik.setFieldValue("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-2">{getFormErrorMessage("email")}</div>
                  <div className={"col-md-12 px-0 position-relative"}>
                    <label className={"form-label mb-1"}>
                      <span>Password</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={"form-control form-control-lg"}
                      value={formik.values.password}
                      onChange={(e) =>
                        formik.setFieldValue("password", e.target.value)
                      }
                    />
                    <div
                      className={"position-absolute top-50 hide"}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </div>
                  <div className="mb-2">{getFormErrorMessage("password")}</div>
                  <div className={"col-md-12 px-0 position-relative"}>
                    <label className={"form-label mb-1"}>
                      <span>Confirm Password</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={"form-control form-control-lg"}
                      value={formik.values.cpassword}
                      onChange={(e) =>
                        formik.setFieldValue("cpassword", e.target.value)
                      }
                    />
                    <div
                      className={"position-absolute top-50 hide"}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </div>
                  <div className="mb-2">{getFormErrorMessage("cpassword")}</div>
                  <div className={"btnWrapper pt-3 px-0 mb-4"}>
                    <button style={{ backgroundColor: "#7e3f25" }} type="submit" className={"btn w-100"}>
                      {loading ? "..." : "Register"}
                    </button>
                  </div>
                </form>
                <div className={"orAccount text-center"}>
                  <div className={"d-flex align-items-center line gap-2 mb-4"}>
                    Or
                  </div>
                  <span>
                    Already have an account? <Link to={"/login"}>Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
