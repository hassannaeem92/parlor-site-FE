import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../styles/breadCrum.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function BreadCrum({ routeElement }) {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const breadcrumbTitle = "Home";
  const getPathTitle = () => {
    const currentRoute = routeElement.find((route) => route.path === path);

    return currentRoute?.title || "";
  };
  const pathTitle = getPathTitle();
  return (
    <div>
      <div className=" breadCrumWrapper d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="text-center">
            <h3 className={"fw-bold"}>{pathTitle}</h3>
            <div className="links d-flex align-items-center gap-1 justify-content-center">
              <span
                onClick={() => navigate("/")}
                className={"d-flex align-items-center gap-1 first"}
              >
                {" "}
                <HiOutlineHome /> <span>Home</span>
              </span>
              {pathTitle && (
                <span className={"last"}>
                  <MdKeyboardArrowRight /> <span>{pathTitle}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadCrum;
