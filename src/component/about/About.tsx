/** @format */

import React from "react";
import "./about.css";
import Footer from "../footer/footer";
import "../costom_styles/costom.css";
import Costum_header from "../costum_header/costum_header";
import {
  FaAndroid,
  FaApple,
  FaArrowDown,
  FaDesktop,
  FaLaptop,
  FaPlayCircle,
} from "react-icons/fa";
import { MdArrowDropDown, MdIso } from "react-icons/md";
import { Link } from "react-router-dom";
const About = () => (
  <>
    <Costum_header title={"About us"} classN={"about_header"} />
    <div className="about_cont">
      <div className="screen">
      <div className="about_ak">
        <h2>About alki.ng</h2>
        <p className="left_text">
          Alki is a cutting-edge web application designed to connect individuals
          with job opportunities and side hustles within their local area. With
          innovative features like an integrated map system, users can easily
          find jobs nearby, explore multiple streams of income, and connect with
          potential employers in just a few clicks. Launched on September 25th,
          2024, Alki aims to simplify job hunting while empowering users to
          discover opportunities tailored to their skills and location. Whether
          you're seeking a full-time role or a side gig, Alki makes the process
          seamless and efficient.
        </p>
      </div>

      <div className="about_kenmentor">
      
        <h2>About Kenmentor</h2>
        <div>
        <p className="rigth_text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          quasi, tempora repellendus facilis facere at ex magnam,a saepe,
          ducimus numquam Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Tempore quidem amet libero at a odio modi, dicta recusandae
          provident repellendus exercitationem illum sunt quod id veritatis
          repellat quia hic.
        </p>
        <a href="/terms"><button className="learn_more_btn"> learn more</button></a>
        </div>
      </div>
      </div>
      <div className="screen">
      <div className="service">
        <div className="service_inner_cont">
        <h2>Other services</h2>
        <div className="service_inner_text">
          <div className="service_cont">
          <div> <span className="num">01 </span>Front End Development </div> <MdArrowDropDown />
          </div>
          <div className="service_cont">
           <div> <span className="num">02 </span>Back End development</div>
            <MdArrowDropDown />
          </div>
          <div className="service_cont">
          <div> <span className="num">03 </span>Full stack development</div>
            <MdArrowDropDown />
          </div>
          <div className="service_cont">
          <div> <span className="num">04 </span>Mechane Learning Integration (MLI)</div>
            <MdArrowDropDown />
          </div>
        </div>
        </div>
        <div className="service_inner_img">
          <img src="./why-us.png" alt="" />
        </div>
        
      </div>
      </div>
      <div className="screen">
      <div className="service_rate">
        <div className="rate_cont_image">
          <img src="./skills.png" alt="" />
        </div>
        <div className="service_box_cont">
        <div className="rate_inner_cont">
          <div className="rate_text"> <p>Fast </p> <p>90%</p></div>
          <div className="rate ">
            <div className="r90"> </div>
          </div>
        </div>
        <div className="rate_inner_cont">
        <div className="rate_text"> <p>Secured </p> <p>100%</p></div>
          <div className="rate ">
          <div className="r100"> </div>
          </div>
        </div>
        <div className="rate_inner_cont">
        <div className="rate_text"> <p>User Friendly </p> <p>99.5%</p></div>
          <div className="rate">
          <div className="r99"> </div>
          </div>
        </div>
        <div className="rate_inner_cont">
        <div className="rate_text"> <p>Bug and Erros </p> <p>2%</p></div>
          <div className="rate">
          <div className="r2"> </div>
          </div>
        </div>
        </div>
      </div>
      
      </div>
      <div className="supported_device">
        <h2>supported devices</h2>
        <div className="supported_device_inner_cont">
          <div className="device">
            <FaAndroid size={100}/>
            <p>android</p>
          </div>
          <div className="device">
          <FaApple size={100}/>
            <p>IOS</p>
          </div>
          <div className="device">
            <FaDesktop size={100}/>
            <p>PC</p>
          </div>
          </div>
        </div>
    </div>

    <Footer />
  </>
);

export default About;
