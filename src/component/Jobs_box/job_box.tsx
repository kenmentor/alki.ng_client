/** @format */

import React from "react";
import "./job_box.css";
import { Link, useNavigate } from "react-router-dom";
import Contact from "../contact/contact";
import "../costom_styles/animation.css";
import { MdLocationPin } from "react-icons/md";

const Job_box = ({
  thumbnail,
  state,
  localgovement,
  title,
  price,
  type,
  contact_num,
  id,
  clickable,
  setcontact,
} = props) => {
  let [social_media, setsocial_media] = React.useState(false);
  let [full_d, setfull_d] = React.useState(false);
  const navigate = useNavigate();
  function toggle_social_media() {
    setsocial_media((prevdata) => {
      return !prevdata;
    });
  }

  function chosechat() {
    alert("pls wait...");
  }
  function handleChat() {
    setcontact({ title: title, contact_num: contact_num, chat_state: true });
  }
  function handlecall() {
    window.location.href = `tel:+${contact_num}`;
  }
  function handleclick() {
    clickable ? navigate(`/jobdetail/${id}`) : alert("cannot be clicked");
  }
  return (
    <>
      <div className="job_box popiny">
        <div className="box" onClick={handleclick}>
          <div className="thumnail">
            <img
              src={thumbnail ? thumbnail : "../default_thumbnail.jpg"}
              alt=""
              className="thumnail"
            />
          </div>
          <div className="describtion">
            <p className="title wrap">{title}</p>
            <div className="location_cont">
              <MdLocationPin opacity={0.5} />
              <p className="country">
                {state}.{localgovement}
              </p>
            </div>
            <p className="description_tag">{type}</p>
            <p className="price">${price}.000</p>
          </div>
        </div>

        <div className="button_container">
          <button onClick={handleChat}> chat</button>
          <button onClick={handlecall}> make a call</button>
        </div>
      </div>
    </>
  );
};

export default Job_box;
