import "./styles/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";
import ProductDetailContent from "./pages/ProductDetails/includes/ProductDetailContent.jsx";
import React from "react";
import Store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <AppRoutes />
        {/* <ProductDetailContent /> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
