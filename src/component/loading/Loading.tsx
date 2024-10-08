/** @format */

import React from "react";
import "./loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading_container">
      <div className="search_circle">
        <div className="search_handle_r">

        </div>
       
      </div>
      <div className="loading_text">Alki.ng is finding the closest job!</div>
      <div className="loading_subtext">Please wait...</div>
       <div className="pulse">

        </div>
        <div className="pulse_r">

        </div>
    </div>
  );
};

export default Loading;
