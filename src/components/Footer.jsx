import React from "react";
import "../styles/footer.scss";
// import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer(props) {
  return (
    <div>
      <div className={"footer py-5 border-top"}>
        <div className={"container"}>
          <div className={"row mx-0"}>
            <div className={"col-lg-6"}>
              <div className={"image mb-3"}>
                {/* <img src={logo} /> */}
              </div>
              <div className={"row mx-0"}>
                <div className={"col-lg-8 px-0"}>
                  <div className={"content"}>
                    We, The Noble Oil Centre, started crafting natural oil back
                    in 2014. At that time we have updated machines but recent
                    advancements in technologies we have upgraded our equipment
                    to state of the art technology to get the most out of the
                    seeds.We are pioneer in natural oil production through cold
                    pressing techniques. Committed to delivering the highest
                    quality oils for enhanced human health, we take pride in our
                    registration with the Health Care Commission i.e. Punjab
                    Food Authority. Experience the goodness of nature with our
                    premium range of oils, meticulously crafted for your
                    well-being. Embark on a journey of well-being with Noble Oil
                    Center.
                  </div>
                  <div className={"content pt-3"}>
                    Plot 52 Line 2 Phase IIA New Canal Park Herbenspura Lahore.
                  </div>
                  <div className={"contactLinks"}>
                    <a
                      className={"text-decoration-none d-block"}
                      href="mailto:nobleoilcenter@gmailcom"
                      target={"_blank"}
                    >
                      nobleoilcenter@gmailcom
                    </a>
                    <a
                      className={"text-decoration-none d-block"}
                      href="tel:012345678"
                      target={"_blank"}
                    >
                      012345678
                    </a>
                    <div className="d-flex align-items-center gap-2 mt-3">
                      <a
                        className={"text-decoration-none"}
                        href="#"
                        target={"_blank"}
                      >
                        <FaFacebookSquare />
                      </a>
                      <a
                        className={"text-decoration-none"}
                        href="#"
                        target={"_blank"}
                      >
                        <FaInstagram />
                      </a>
                      <a
                        className={"text-decoration-none"}
                        href="#"
                        target={"_blank"}
                      >
                        <FaXTwitter />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-6"}>
              <div className={"ourInformtion"}>
                <h6 className={"mb-3"}>Our Information</h6>
                <ul className={"list-unstyled"}>
                  <li>
                    <Link to={"/faqs"}>FAQs</Link>
                  </li>
                  <li>
                    <Link to={"/terms-conditions"}>Terms & Condition</Link>
                  </li>
                  <li>
                    <Link to={"/refund-policy"}>Refund Policy</Link>
                  </li>
                  <li>
                    <Link to={"/contact"}>Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"copyRight bg-light py-3"}>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-12"}>
              <div className={"text-center"}>
                ©2023 Copyright Noble Oil Center. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
