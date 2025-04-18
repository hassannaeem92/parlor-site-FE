import React, { useEffect } from "react";
import Header from "../components/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import BreadCrum from "../components/BreadCrum.jsx";
import Footer from "../components/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERROR, RESET_SUCCESS } from "../store/Types/AuthTypes.js";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import FooterParlor from "../components/FooterParlor.jsx";

function AppLayout({ routeElement }) {
  const path = useLocation().pathname;

  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.AuthReducers
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: RESET_ERROR });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);

      dispatch({ type: RESET_SUCCESS });
    }
  }, [success]);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <ProgressSpinner />
        </div>
      )}
      {path !== "/" && <Header />}
      {path !== "/" &&
        path !== "/login" &&
        path !== "/register" &&
        path !== "/my-orders" &&
        // path !== "/my-profile" && <BreadCrum routeElement={routeElement} />}
        path !== "/my-profile"}
      <Outlet />
      {path !== "/" && path !== "/login" && path !== "/register" && <FooterParlor />}
      
    </>
  );
}

export default AppLayout;
