import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import success from "../assets/images/success.png";
import backend from "../api/backend";
import "../styles/emailverify.css";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const { id, token } = useParams();
  const [validUrl, setValidUrl] = useState(false);

  const verifyEmailUrl = useCallback(async () => {
    try {
      const url = `/${id}/verify/${token}`;
      const { data } = await backend.get(url);
      console.log(data);
      setValidUrl(true);
    } catch (error) {
      console.error(error.response);
      setValidUrl(false);
      toast.error(error.response.data.error.msg);
    }
  }, [id, token]);

  // useEffect(() => {
  //   verifyEmailUrl();
  // }, []);

  // if (validUrl === null) {
  //   // Component is still loading, you might want to show a loading spinner or message
  //   return <p>Loading...</p>;
  // }

  // Render only once, either success or failure
  return (
    <>
      <div className="verify-container">
        {validUrl ? (
          <>
            <img src={success} alt="success_img" />
            <h1>Email verified successfully</h1>
            <Link to="/login">
              <button className="verify-green_btn">Login</button>
            </Link>
          </>
        ) : (
          <button className="verify-green_btn" onClick={verifyEmailUrl}>
            Click Here To Verify Your Account
          </button>
        )}
      </div>
    </>
  );
};

export default React.memo(EmailVerify);
