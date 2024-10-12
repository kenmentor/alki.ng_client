/** @format */

import React from "react";
import "./header.css";
import Filter from "../filter/Filter";
import { Link } from "react-router-dom";
import { FaSearch, FaUserAlt, FaGuilded } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";

// Define the props interface
interface HeaderProps {
  setsearchQuery: (query: string) => void;
  searchQuery: string;
  side_buttons: {
    more: boolean;
    filter: boolean;
    create: boolean;
  };
  setside_buttons: React.Dispatch<
    React.SetStateAction<HeaderProps["side_buttons"]>
  >;
  setfilter_input: (input: any) => void; // Specify a more detailed type if available
  filter_input: any; // Specify a more detailed type if available
 
  setkeypress: (key: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  setsearchQuery,
  searchQuery,
  side_buttons,
  setside_buttons,
  setfilter_input,
  filter_input,
  setkeypress,
}) => {
  const toggle_create = () => {
    setside_buttons((prev) => ({
      more: false,
      filter: false,
      create: !prev.create,
    }));
  };

  const toggle_filter = () => {
    setside_buttons((prev) => ({
      more: false,
      create: false,
      filter: !prev.filter,
    }));
  };

  const toggle_more = () => {
    setside_buttons((prev) => ({
      create: false,
      filter: false,
      more: !prev.more,
    }));
  };

  const offall_sidebutton = () => {
    setside_buttons({ create: false, filter: false, more: false });
  };

  const get_search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src="/20240808_190559.png" alt="Logo" />
          </Link>
        </div>
        <div className="search_bar widthdec delay">
          <FaSearch className="search_icon" opacity={0.5} />
          <input
            type="search"
            placeholder="search for jobs around you"
            onChange={get_search}
            onClick={offall_sidebutton}
            onKeyDown={(e) => setkeypress(e.key.toLowerCase())}
            value={searchQuery}
          />
        </div>
        <div className="side_icon">
          <button className="create">
            <Link to="/create">
              <img src="/create (2).png" alt="Create" />
            </Link>
          </button>
          <button onClick={toggle_filter}>
            <img src="/20240624_184240.png" alt="Filter" />
          </button>
          <button
            onClick={toggle_more}
            className="moreBtn"
            style={!side_buttons.more ? { transform: "rotate(0deg)" } : {}}
          >
            <img className="more" src="/20240624_185034.png" alt="More" />
          </button>

          <div
            className="sidebar"
            style={!side_buttons.more ? { right: "-180px" } : {}}
          >
            <Link to="/about">
              <li>
                <FaUserAlt opacity={0.7} /> about us
              </li>
            </Link>
            <Link to={`https://wa.me/23490117264336`}>
              <li>
                <MdContactPage opacity={0.7} /> contact us
              </li>
            </Link>
            <Link to="/about">
              <li>
                <FaGuilded opacity={0.7} /> terms & conditions
              </li>
            </Link>
          </div>
          {side_buttons.more && (
            <div className="backdrop_chat" onClick={toggle_create}></div>
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
