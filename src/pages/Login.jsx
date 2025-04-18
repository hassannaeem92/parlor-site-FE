import React, { useEffect, useState } from "react";
import "../styles/login.scss";
// import image from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/AsynMethod/AuthMethod";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../store/Types/AuthTypes";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaval, setCaptchaVal] = useState("");
  const recaptchaRef = React.createRef();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.AuthReducers
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};
      if (data.email?.length === 0) {
        errors.email = "Email required.";
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email address.";
      }
      if (data.password?.length === 0) {
        errors.password = "Password Required";
      }
      return errors;
    },
    onSubmit: async (data) => {
      dispatch(userLogin(data)).then((success) => {
        if (success) {
          formik.resetForm();
          navigate("/");
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
      <div className={"login d-flex align-items-center justify-content-center"}>
        <div className={"container"}>
          <div className={"row mx-auto justify-content-center"}>
            <div className={"col-md-6 col-lg-4 px-0"}>
              <div className={"bg-white px-4 pt-1 pb-4  rounded shadow"}>
                <div className={"text-center brand"}>
                  {/* <img src={image} /> */}
                  <div className={"py-3"}>
                    <h2 style={{ color: "#7e3f25" }}>Login</h2>
                  </div>
              
                </div>
                <form className={"row mx-0"} onSubmit={formik.handleSubmit}>
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
                    <label
                      className={
                        "form-label mb-1 d-flex align-items-center justify-content-between"
                      }
                    >
                      <span>Password</span>
                      <Link to={"/forget-password"}>Forgot password?</Link>
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
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Lc-cDAqAAAAAMHCgZO129HpMZ7MebsPaa7oCO-7"
                    //sitekey="6LfdmPQpAAAAAEp1eQGfS5DqbY6c8khraWIZ4F7P"
                    onChange={(e) => setCaptchaVal(e)}
                  />
                  <div className={"btnWrapper pt-3 px-0 mb-4"}>
                    <button
                    style={{ backgroundColor: "#7e3f25" }}
                      type="submit"
                      className={"btn w-100"}
                      disabled={!captchaval}
                    >
                      {loading ? "..." : "Login"}
                    </button>
                  </div>
                </form>
                <div className={"orAccount text-center"}>
                  <div className={"d-flex align-items-center line gap-2 mb-4"}>
                    Or
                  </div>
                  <span>
                    {" "}
                    Don't have any account?{" "}
                    <Link to={"/register"}> Register</Link>
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

export default Login;
