import React, { useEffect, useState } from "react";
import "../styles/login.scss";
import image from "../assets/images/Logo.webp";
import { Link, useParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/AsynMethod/AuthMethod";
import { toast } from "react-toastify";
import successImg from "../assets/images/success.png";
import { RESET_ERROR, RESET_SUCCESS } from "../store/Types/AuthTypes";

function ResetPassword() {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const { loading, error, success } = useSelector(
    (state) => state.AuthReducers
  );
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validate: (data) => {
      let errors = {};
      if (data.password?.length === 0) {
        errors.password = "Password Required.";
      } else if (data.password?.length < 8) {
        errors.password = "At least 8 character Password Required.";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit.";
      }
      if (data.cpassword?.length === 0) {
        errors.cpassword = "Confirm Password Required.";
      } else if (data.cpassword !== data.password) {
        errors.cpassword = "Password Not Matched.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      const url = `/${id}/reset-password/${token}`;
      dispatch(resetPassword(data, url, formik));
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
    <>
      {successMsg ? (
        <div className="verify-container">
          <img src={successImg} alt="success_img" />
          <h1>Password reset successfully</h1>
          <Link to="/login">
            <button className="verify-green_btn">Login</button>
          </Link>
        </div>
      ) : (
        <>
          <div>
            <div
              className={
                "forget d-flex align-items-center justify-content-center"
              }
            >
              <div className={"container"}>
                <div className={"row mx-auto justify-content-center"}>
                  <div className={"col-md-6 col-lg-4 px-0"}>
                    <div className={"bg-white px-4 py-5 rounded shadow"}>
                      <div className={"text-center brand"}>
                        <img src={image} />
                        <div className={"py-3"}>
                          <i>Reset Password</i>
                        </div>
                      </div>
                      <form
                        className={"row mx-0"}
                        onSubmit={formik.handleSubmit}
                      >
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
                        <div className="mb-2">
                          {getFormErrorMessage("password")}
                        </div>
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
                        <div className="mb-2">
                          {getFormErrorMessage("cpassword")}
                        </div>
                        <div className={"btnWrapper pt-3 px-0"}>
                          <button className={"btn w-100"}>
                            {loading ? "..." : "Reset Password"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ResetPassword;
