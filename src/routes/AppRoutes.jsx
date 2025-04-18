import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import AppLayout from "../layouts/AppLayout";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DealDetails from "../pages/DealsDetails/index.jsx";
import brandLogo from "../assets/images/beauty-logo.jpeg";
const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Faqs = lazy(() => import("../pages/Faqs"));
const DealsView = lazy(() => import("../pages/DealsDetails/DealsView.jsx"));

const Checkout = lazy(() => import("../pages/Checkout"));
const RefundPolicy = lazy(() => import("../pages/RefundPolicy"));
const TermsCondition = lazy(() => import("../pages/TermsCondition"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ShopDetails = lazy(() => import("../pages/ShopDetails"));
const Shops = lazy(() => import("../pages/Shops"));
const Forget = lazy(() => import("../pages/Forget.jsx"));
const Offers = lazy(() => import("../pages/Offers/includes/Offers.jsx"));
const EmailVerify = lazy(() => import("../components/EmailVerify.jsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.jsx"));
const MyProfile = lazy(() => import("../pages/MyProfile/index.jsx"));
const MyOrders = lazy(() => import("../pages/MyOrders/index.jsx"));
const ServiceDetails = lazy(() => import("../pages/ServiceDetail/index.jsx"));
const PaymentSuccess = lazy(() =>
  import("../pages/PaymentResponse/PaymentSuccess")
);

// Loading spinner component
// const LoadingSpinner = () => (
//   <div
//     className="flex justify-content-center align-items-center"
//     style={{ height: "100vh" }}
//   >
//     <ProgressSpinner />
//   </div>
// );

const LoadingSpinner = () => (
  <div
    className="flex flex-column justify-content-center align-items-center"
    style={{ height: "100vh" }} // Full viewport height for centering
  >
    {/* Logo */}
    <h2>Pakistan`s No. 1 Best Beauty Services</h2>
    <img
      src={brandLogo}
      alt="Brand Logo"
      style={{
        width: "150px", // Adjust size as needed
        height: "auto", // Maintain aspect ratio
        marginBottom: "20px", // Space between logo and spinner
      }}
    />
    {/* Spinner */}
    {/* <ProgressSpinner /> */}
  </div>
);

function AppRoutes() {
  const routeElement = [
    { path: "/", element: <Home />, title: "Home" },
    { path: "/about", element: <Faqs />, title: "FAQs" },
    { path: "/deals", element: <DealsView />, title: "Deals" },
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

    {
      path: "/service-details/:id",
      element: <ServiceDetails />,
      title: "Service Details",
    },

    {
      path: "/deal-details/:id",
      element: <DealDetails />,
      title: "Deal Details",
    },



  ];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<AppLayout routeElement={routeElement} />}>
          <Route index element={<Home />} />
          <Route path={"/shops"} element={<Shops />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route
            path={"/product-details/:productId/:varientId"}
            element={<ProductDetails />}
          />
          <Route
            path="/test-product/:productId/:varientId"
            element={<div>Test Product Page</div>}
          />
          <Route path={"/about"} element={<Faqs />} />
          <Route path={"/deals"} element={<DealsView />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path={"/refund-policy"} element={<RefundPolicy />} />
          <Route path={"/terms-conditions"} element={<TermsCondition />} />
          <Route path={"/shop-details"} element={<ShopDetails />} />
          <Route path={"/offers"} element={<Offers />} />
          <Route path={"/my-profile"} element={<MyProfile />} />
          <Route path={"/my-orders"} element={<MyOrders />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/service-details/:id"} element={<ServiceDetails />} />
          <Route path={"/deal-details/:id"} element={<DealDetails />} />
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
    </Suspense>
  );
}

export default AppRoutes;
