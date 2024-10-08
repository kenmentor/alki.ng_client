/** @format */

import React from "react";
import "./job_box_p.css";
import { Link, useNavigate } from "react-router-dom";
const Job_box_p = (props) => {
  const { thumbnail, description, id, clickable } = props;
  let [social_media, setsocial_media] = React.useState(false);
  let [full_d, setfull_d] = React.useState(false);
  const navigate = useNavigate();
  function handle_click() {
    clickable ? navigate(`/jobdetail/${id}`) : alert("cannot be clicked");
  }
  return (
    <div className=" job_box_p" onClick={handle_click}>
      <div className="thumbnail_jobbox_p_cont">
        <div className="cover">
          <img src="" alt="" />
        </div>
        <img
          className="thumbnail_jobbox_p"
          src={thumbnail ? thumbnail : "../default_thumbnail.jpg"}
          alt=""
        />
      </div>
      <div className="description">
        <p>{description}</p>
      </div>

      <div className="apply_btn_cont">
        <button className="apply_btn"> apply now</button>
      </div>
    </div>
  );
};

export default Job_box_p;
