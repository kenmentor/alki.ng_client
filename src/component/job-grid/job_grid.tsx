/** @format */

import React, { useEffect, useState } from "react";
import "./job-grid.css";
import Job_box from "../Jobs_box/job_box";
import PeopleSearch from "../peopleSeach/PeopleSearch";
import Bussadd from "../bussAdds/Bussadd";
import Job_box_p from "../jobs_box_p/Job_box_p";
import { Link } from "react-router-dom";
import Contact from "../contact/contact";
import Posted_recently from "../posted_recently/posted_recently";

const Job_grid = ({
  filteredata,
  setsearchQuery,
  setkeypress,
  setcontact,
} = props) => {
  let [tp, setp] = useState({ title: "yy" });

  let job_boxes = filteredata.map((data) => {
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
          contact_num={data.contact_num}
          id={data.id}
          key={data.id}
          clickable={true}
        />
      );
    } else {
      return (
        <Job_box
          thumbnail={data.thumbnail}
          state={data.state}
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

  return (
    <>
      <div>
        <div className="today job_grid">
          {job_boxes}
          {
            job_boxes.length === 0 && (
              <div className="no_result_cont">
                <p className="no_result_message"> No Result Found</p>
              </div>
            ) //
          }
        </div>
        <PeopleSearch
          setsearchQuery={setsearchQuery}
          setkeypress={setkeypress}
        />
        <Bussadd />
        <Posted_recently
          limit={3}
          placeholder={"you may be interested in "}
          title={""}
          id={4}
        />
      </div>
    </>
  );
};

export default Job_grid;
