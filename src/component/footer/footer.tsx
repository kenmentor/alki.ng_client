/** @format */

import React, { useState } from "react";
import "./footer.css";
import { FaAndroid, FaApple, FaFacebook, FaFacebookF, FaFirefoxBrowser, FaGithub, FaGuilded, FaHome, FaRegNewspaper, FaTiktok, FaUser, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MdComputer, MdFacebook, MdIosShare } from "react-icons/md";
import { Link, useHref } from "react-router-dom";
const Footer = () => {
  let [isFeedback, setisFeedback] = useState(false);

  return (
    <>
      <div className="footer" style={!isFeedback ? { display: "none" } : {}}>
        <h1 className="feedback_title">Send Us a Feedback</h1>
        <div className="send_feedback">
          <div className="email_section">
            <input
              type="email"
              className="feedback_email"
              placeholder="Email"
            />
          </div>
          
          <textarea
            name=""
            className="feedback_description"
            id=""
            placeholder="write a feedback message "
          ></textarea>
          <button className="send_feedback_btn"> send feedback </button>
        </div>
      </div>{" "}
      <div className="footer_">
        
        <div className="top_footer">
         <h1>alki.ng get your online job</h1>
         <div className="content">
         <div className='social'> 
          <h2>social media</h2>
          <Link to={'/facebook.com/@kenmentorcode'}><MdFacebook/>facebook</Link>
          <Link to={`https://wa.me/23490117264336`}><FaWhatsapp/>whatapp</Link>
          <Link to={"https://tiktok.com/@kenmentorcode"}><FaTiktok/>Tictok</Link>
          <Link to={'https://youtube.com/@kenmentorcode?si=35Cu2XEPVnJFJ'}><FaYoutube/>youtube</Link>
         </div>
         <div className="pages">
          <h2>pages</h2>
          <Link to={'/'}><FaHome/>home</Link>
          <Link to={'/about'}><FaUser/>about</Link>
          <Link to={'/about'}><FaGuilded/>terms&condition</Link>
         </div>
         <div className="resources">
          <h2>resources</h2>
          <Link to={'https://github.com/kenmentor/ '}><FaGithub/>github</Link>
          <Link to={ '/firebase.com '}><FaFirefoxBrowser/> firebase</Link>
          <Link to={ '/render.com '}><FaRegNewspaper/>render</Link>
         </div>
         <div className="resources">
         <h2>suported device</h2>
          <Link to={ '/about'}><MdComputer/>pc</Link>
          <Link to={ '/about'}><FaApple/>ios</Link>
          <Link to={ '/about'}><FaAndroid/> android</Link>
         </div>
         </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
