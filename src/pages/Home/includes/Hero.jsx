import React from "react";
import "../../../styles/Hero.scss";
import { IoSearchOutline } from "react-icons/io5";
import image from "../../../assets/images/Hero.webp";
import Header from "../../../components/Header.jsx";

// used directly inside the index.jsx

function Hero({ setSearchProduct }) {
  const handleSearchClick = () => {
    console.log("Clicked search");
    const section = document.querySelector("#productList");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKeyDown = (e) => {
    console.log("Typing");
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <>
      <Header />
      <div className={"HeroWrapper"}>
        <div className={"d-block "}>
          <div className={"row mx-auto justify-content-center"}>
            <div className={"col-lg-6 px-0"}>
              <div className={"h1 mb-0 fw-bold"}>
                Groceries Delivered in 90 Minute
              </div>
              <div className={"py-4 title"}>
                Get your healthy foods & snacks delivered at your doorsteps all
                day every day
              </div>
              <div className={"searchWrapper bg-white shadow"}>
                <input
                  placeholder={"Search your Products From here"}
                  type="text"
                  onChange={(e) => setSearchProduct(e.target.value)}
                  style={{ boxSizing: "border-box", width: "100% !important" }}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className={"btn d-flex align-items-center gap-2"}
                  onClick={handleSearchClick}
                >
                  <IoSearchOutline />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
