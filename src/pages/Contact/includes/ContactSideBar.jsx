import React from "react";
import image from "../../../assets/images/contact.svg";
import "../../../styles/contactSideBar.scss";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function ContactSideBar(props) {
  return (
    // <div className={"contactSideBar"}>
    //   <div className={"bg-white p-2 p-md-4 rounded-3"}>
    //     <div className={"image mb-4 text-center"}>
    //       <img src={image} className={"img-fluid"} />
    //     </div>
    //     <div className={"social mb-4"}>
    //       <div className={"title h6"}>Address</div>
    //       <div className={"Subtitle"}>
    //         Plot 52 Line 2 Phase IIA New Canal Park Herbenspura Lahore
    //       </div>
    //     </div>
    //     <div className={"social mb-4"}>
    //       <div className={"title h6"}>Phone</div>
    //       <div className={"Subtitle"}>+129290122122</div>
    //     </div>
    //     <div className={"social mb-4"}>
    //       <div className={"title h6"}>Email Address</div>
    //       <div className={"Subtitle"}>nobleoilcenter@gmailcom</div>
    //     </div>
    //     <div className={"social mb-4"}>
    //       <div className={"title h6"}>Website</div>
    //       <div className={"Subtitle"}>https://nobleoilcentre.com</div>
    //     </div>
    //     {/* <div className={"social mb-4"}>
    //       <div className={"title h6"}>Follow Us</div>
    //       <div className={"Subtitle"}>
    //         <span>
    //           <FaFacebookSquare />
    //         </span>{" "}
    //         <span>
    //           <FaXTwitter />
    //         </span>{" "}
    //         <span>
    //           <FaInstagram />
    //         </span>
    //       </div>
    //     </div> */}
    //   </div>
    // </div>
    <div className={"contactSideBar"}>
      <div
        className={"bg-white p-3 p-md-4 rounded-3 shadow"}
        style={{ border: "1px solid #fee2f8" }}
      >
        <div className={"image mb-4 text-center"}>
          <img src={image} className={"img-fluid rounded-circle"} />
        </div>
        <div className={"social mb-4"}>
          <div className={"title h6 text-uppercase"} style={{ color: "#6a1b4d" }}>
            Address
          </div>
          <div className={"Subtitle text-muted"}>
            Plot 52 Line 2 Phase IIA New Canal Park Herbenspura Lahore
          </div>
        </div>
        <div className={"social mb-4"}>
          <div className={"title h6 text-uppercase"} style={{ color: "#6a1b4d" }}>
            Phone
          </div>
          <div className={"Subtitle text-muted"}>+129290122122</div>
        </div>
        <div className={"social mb-4"}>
          <div className={"title h6 text-uppercase"} style={{ color: "#6a1b4d" }}>
            Email Address
          </div>
          <div className={"Subtitle text-muted"}>nobleoilcenter@gmail.com</div>
        </div>
        <div className={"social mb-4"}>
          <div className={"title h6 text-uppercase"} style={{ color: "#6a1b4d" }}>
            Website
          </div>
          <div className={"Subtitle text-muted"}>
            <a href="https://nobleoilcentre.com" style={{ color: "#e91e63" }}>
              nobleoilcentre.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSideBar;
