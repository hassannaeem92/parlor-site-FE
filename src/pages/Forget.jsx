import React, { useEffect, useState } from "react";
import "../styles/login.scss";
import image from "../assets/images/Logo.webp";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../store/AsynMethod/AuthMethod";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../store/Types/AuthTypes";

function Forget() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.AuthReducers
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (data) => {
      let errors = {};
      if (data.email?.length === 0) {
        errors.email = "Email required.";
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email address.";
      }
      return errors;
    },
    onSubmit: async (data) => {
      dispatch(forgotPassword(data)).then((success) => {
        if (success) {
          formik.resetForm();
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
        className={"forget d-flex align-items-center justify-content-center"}
      >
        <div className={"container"}>
          <div className={"row mx-auto justify-content-center"}>
            <div className={"col-md-6 col-lg-4 px-0"}>
              <div className={"bg-white px-4 py-5 rounded shadow"}>
                <div className={"text-center brand"}>
                  <img src={image} />
                  <div className={"py-3"}>
                    <i>Forgot Password</i>
                  </div>
                </div>
                <form className={"row mx-0"} onSubmit={formik.handleSubmit}>
                  <div className={"col-md-12 px-0"}>
                    <label className={"form-label mb-1"}>Email</label>
                    <input
                      className={"form-control form-control-lg"}
                      placeholder={"demo@gmail.com"}
                      value={formik.values.email}
                      onChange={(e) =>
                        formik.setFieldValue("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-2">{getFormErrorMessage("email")}</div>
                  <div className={"btnWrapper pt-3 px-0"}>
                    <button className={"btn w-100"}>
                      {loading ? "..." : "Submit Email"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forget;
