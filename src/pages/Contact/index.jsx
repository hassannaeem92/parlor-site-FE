import React from 'react';
import ContactForm from "./includes/ContactForm";
import ContactSideBar from "./includes/ContactSideBar";
import '../../styles/ContactLayout.scss';

export default function Contact() {
    return (
              <ContactForm />
      //   <div className={"ContactLayout py-5"} style={{ backgroundColor: "#f7f7f7" }}>
      //   <div className={"container"}>
      //     <div className={"row"}>
      //       <div className={"col-lg-4 mb-3 order-last order-md-first"}>
      //         {/* <ContactSideBar /> */}
      //       </div>
      //       <div className={"col-lg-12 mb-3"}>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
}

