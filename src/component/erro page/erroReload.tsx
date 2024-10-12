/** @format */

import React, { useState, useMemo } from "react";
import "./erro.css";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ErroReload = () => {
  const navigate = useNavigate();
  function handleClick() {
    window.location.reload();
  }

  let [count, setcount] = useState(10);

  return (
    <div className="erroReload">
      <MdError size={100} className="erroPop" />
      <h1> Try reloading</h1>
      <h2>An Erro Has occured</h2>
      <button className="reload_btn" onClick={handleClick}>
        reload
      </button>
    </div>
  );
};
export default ErroReload;
