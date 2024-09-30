/** @format */

import React, { useEffect, useState } from "react";
import "../job-grid/job-grid.css";
import "./Posted_recently.css";
import Job_box_p from "../jobs_box_p/Job_box_p";
import Job_box from "../Jobs_box/job_box";
import Contact from "../contact/contact";
import { FaArrowDown } from "react-icons/fa";
const Posted_recently = ({
  limit,
  placeholder,
  title,
  state,
  type,
  id,
  reload,
}) => {
  let [data, setdata] = useState([]);
  let [loading, setloading] = useState(true);
  let [contact, setcontact] = useState({ title: "saswssd" });
  let [serverLimit, setserverLimit] = useState(limit);
  console.log(limit);
  useEffect(() => {
    let date = new Date();
    const fecthData = async () => {
      fetch(
        `http://localhost:3001/alki//get_posted_recently/?limit=${serverLimit}&title=${title}&state=${state}&type=${type}id=${id}`
      )
        .then((response) => response.json())
        .then((data) => setdata(data))
        .then(() => setloading(false));
    };
    fecthData();
  }, [serverLimit]);
  function h() {
    setserverLimit((prev) => prev + 3);
  }
  let posted_recently = data.map((data) => {
    if (data.type == "professional_job") {
      return (
        <Job_box_p
          thumbnail={data.thumbnail}
          country={data.country}
          state={data.state}
          data={data.date}
          description={data.description}
          localgovement={data.localgovement}
          title={data.title}
          price={data.price}
          id={data.id}
          key={data.id}
          clickable={true}
        />
      );
    } else {
      return (
        <Job_box
          thumbnail={data.thumbnail}
          country={data.country}
          state={data.state}
          data={data.date}
          description={data.description}
          localgovement={data.localgovement}
          title={data.title}
          price={data.price}
          type={data.type}
          contact_num={data.contact_num}
          id={data.id}
          key={data.id}
          clickable={true}
          setcontact={setcontact}
        />
      );
    }
  });
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div className="today_job_title_cont">
        <h1 className="today_jo_title"> {placeholder}</h1>
      </div>
      {contact.chat_state && (
        <Contact
          setcontact={setcontact}
          price={666}
          type={"eee"}
          title={contact.title}
          contact_num={contact.contact_num}
          home={true}
        />
      )}
      <div className="today job_grid">{posted_recently}</div>
      {title && (
        <div className="more_cont">
          <button onClick={h}>
            see more <FaArrowDown />
          </button>
        </div>
      )}
    </div>
  );
};

export default Posted_recently;
