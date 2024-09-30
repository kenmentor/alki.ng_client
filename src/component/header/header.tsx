/** @format */

import React, { useEffect, useState } from "react";
import "./header.css";
import Filter from "../filter/Filter";
import { Link } from "react-router-dom";
import {
  FaCode,
  FaGripLinesVertical,
  FaGuilded,
  FaPodcast,
  FaSearch,
  FaSearchengin,
  FaUpload,
  FaUserAlt,
} from "react-icons/fa";
import {
  MdContactPage,
  MdContactSupport,
  MdCreate,
  MdFileUploadOff,
  MdFilter,
  MdFilter9Plus,
  MdFilterBAndW,
  MdOutlineUploadFile,
  MdPostAdd,
  MdSearch,
} from "react-icons/md";
const Header = ({
  setsearchQuery,
  searchQuery,
  side_buttons,
  setside_buttons,
  setfilter_input,
  filter_input,
  mode,
  setmode,
  setkeypress,
} = props) => {
  function toggle_create() {
    setside_buttons((preValue) => {
      return {
        more: false,
        filter: false,
        create: !preValue.create,
      };
    });
  }

  function toggle_filter() {
    setside_buttons((preValue) => {
      return {
        more: false,
        create: false,
        filter: !preValue.filter,
      };
    });
  }

  function toggle_more() {
    setside_buttons((preValue) => {
      return {
        create: false,
        filter: false,
        more: !preValue.more,
      };
    });
  }
  function offall_sidebutton() {
    setside_buttons((preValue) => {
      return {
        create: false,
        filter: false,
        more: false,
      };
    });
  }

  function get_search(e) {
    setsearchQuery(e.target.value);
  }
  let filter_style = { top: "75" };
  function toggleMode() {
    setmode((prevmode) => {
      return !prevmode;
    });
  }
  console.log("eee", searchQuery);
  return (
    <>
      <div className="header ">
        <div className="logo">
          <Link to={"/"}>
            <img src="/20240808_190559.png" alt="" />
          </Link>
        </div>
        <div className="search_bar widthdec delay ">
          <FaSearch className="search_icon" opacity={0.5} />

          <input
            type="search"
            placeholder="search for jobs arround you"
            onChange={get_search}
            onClick={offall_sidebutton}
            onKeyDown={(e) => setkeypress(e.key)}
            value={searchQuery}
          />
        </div>
        <div className="side_icon">
          <button className="creat">
            <Link to={"/create"}>
              <img src="/create (2).png" alt="" />
            </Link>
          </button>
          <button onClick={toggle_filter}>
            <img src="/20240624_184240.png" alt="" />
          </button>
          <button
            onClick={toggle_more}
            className="moreBtn"
            style={!side_buttons.more ? { transform: "rotate(0deg)" } : {}}
          >
            <img className="more" src="/20240624_185034.png" alt="" />
          </button>

          <div
            className="sidebar "
            style={!side_buttons.more ? { right: "-180px" } : {}}
          >
            <Link to={"/about"}>
              <li>
                <FaUserAlt opacity={0.7} /> about us
              </li>
            </Link>
            <Link to={`https://wa.me/23490117264336`}>
              <li>
                <MdContactPage opacity={0.7} />
                contact us
              </li>
            </Link>
            <Link to={"/about"}>
              <li>
                <FaGuilded opacity={0.7} /> terms & conditions{" "}
              </li>
            </Link>
          </div>
          {side_buttons.more ? (
            <div className="backdrop_chat" onClick={toggle_create}></div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Filter
        toggle_create={toggle_create}
        filter={side_buttons.filter}
        setfilter_input={setfilter_input}
        filter_input={filter_input}
      />
    </>
  );
};

export default Header;
