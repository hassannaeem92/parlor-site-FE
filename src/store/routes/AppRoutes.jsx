import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Contact from "../../pages/Contact";
import ProductDetails from "../../pages/ProductDetails";
import Faqs from "../../pages/Faqs";
import Checkout from "../../pages/Checkout";
import RefundPolicy from "../../pages/RefundPolicy";
import TermsCondition from "../../pages/TermsCondition";
import AppLayout from "../../layouts/AppLayout";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ShopDetails from "../../pages/ShopDetails";
import Shops from "../../pages/Shops";
import Forget from "../../pages/Forget.jsx";
import FlashSale from "../pagesOffers/index.jsx";
import Offers from "../pagesOffers/includes/Offers.jsx";
import EmailVerify from "../components/EmailVerify.jsx";
import ResetPassword from "../../pagesResetPassword.jsx";
import MyProfile from "../../pagesMyProfile/index.jsx";
import MyOrders from "../../pages/MyOrders/index.jsx";
import PaymentSuccess from "../pages/PaymentResponse/PaymentSuccess";
function AppRoutes() {
  const routeElement = [
    { path: "/", element: <Home />, title: "Home" },
    { path: "/faqs", element: <Faqs />, title: "FAQs" },
    { path: "/contact", element: <Contact />, title: "Contact" },
    {
      path: "/refund-policy",
      element: <RefundPolicy />,
      title: "Customer Refund Policy",
    },
    { path: "/offers", element: <Offers />, title: "Offers" },
    {
      path: "/terms-conditions",
      element: <TermsCondition />,
      title: "Terms & Conditions",
    },
    {
      path: "/shops",
      element: <Shops />,
      title: "Shops",
    },
    {
      path: "/shop-details",
      element: <ShopDetails />,
      title: "Shop Details",
    },
    {
      path: "/offers",
      element: <Offers />,
      title: "Offers",
    },
    {
      path: "/my-profile",
      element: <MyProfile />,
      title: "My Profile",
    },
    {
      path: "/my-orders",
      element: <MyOrders />,
      title: "My Orders",
    },
    {
      path: "/checkout",
      element: <Checkout />,
      title: "Checkout",
    },
  ];
  return (
    <Routes>
      <Route element={<AppLayout routeElement={routeElement} />}>
        <Route index element={<Home />} />
        <Route path={"/shops"} element={<Shops />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route
          path={"/product-details/:productId/:varientId"}
          element={<ProductDetails />}
        />

        <Route path={"/faqs"} element={<Faqs />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path={"/refund-policy"} element={<RefundPolicy />} />
        <Route path={"/terms-conditions"} element={<TermsCondition />} />
        <Route path={"/shop-details"} element={<ShopDetails />} />
        <Route path={"/offers"} element={<Offers />} />
        <Route path={"/my-profile"} element={<MyProfile />} />
        <Route path={"/my-orders"} element={<MyOrders />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Route>

      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/payment-response" element={<PaymentSuccess />} />
      <Route
        path="/users/:id/forgot-password/:token"
        element={<ResetPassword />}
      />
      <Route path={"/forget-password"} element={<Forget />} />
      <Route path={"/*"} element={<Navigate replace to={"/"} />} />
    </Routes>
  );
}

export default AppRoutes;
