/** @format */

import React from "react";
import { MdArrowBackIos, MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
interface Costum_headerprops {
  title?: string;
  classN?: string;
}
const Costum_header: React.FC<Costum_headerprops> = ({ title, classN }) => {
  function goBack() {
    history.back();
  }
  return (
    <div className={`${classN}`}>
      <MdArrowBackIos
        size={40}
        style={{ padding: "0 10", cursor: "pointer" }}
        onClick={goBack}
      />

      <h2>{title}</h2>
    </div>
  );
};

export default Costum_header;
