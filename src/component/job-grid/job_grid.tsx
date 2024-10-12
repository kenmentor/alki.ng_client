/** @format */

import React, { useEffect, useState } from "react";
import "./job-grid.css";
import Job_box from "../Jobs_box/job_box";
import PeopleSearch from "../peopleSeach/PeopleSearch";
// import Bussadd from "../bussAdds/Bussadd";
import Job_box_p from "../jobs_box_p/Job_box_p";
import Posted_recently from "../posted_recently/Posted_recently";

// Define props interface
interface JobGridProps {
  filteredData: Array<JobData>;
  setsearchQuery: (query: string) => void;
  setkeypress: (key: string) => void;
  setcontact: (contact: ContactData) => void;
}

// Define data interfaces for filtered job data
interface JobData {
  _id: string;
  title: string;
  thumbnail: string;
  country: string;
  state: string;
  date: string; // Ensure the type matches its usage
  description: string;
  localgovement: string;
  price: string; // Assuming this is a string unless conversion is needed
  type: string;
  contact_num: string;
}

// Define interface for contact data
interface ContactData {
  title: string;
  contact_num?: string; // Added optional field to match usage
}

const Job_grid: React.FC<JobGridProps> = ({
  filteredData,
  setsearchQuery,
  setkeypress,
  setcontact,
}) => {
  // Removed unused state `tp`

  // Render job boxes based on the data
  const job_boxes = filteredData.map((data) => {
    if (data.type === "professional_job") {
      return (
        <Job_box_p
          thumbnail={data.thumbnail}
          country={data.country}
          state={data.state}
          date={data.date} // Fixed: renamed `data={data.date}` to `date={data.date}`
          description={data.description}
          localgovement={data.localgovement}
          title={data.title}
          price={data.price} // Assuming price is a string, else convert it if necessary
          contact_num={data.contact_num}
          id={data._id}
          key={data._id}
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
          id={data._id}
          key={data._id}
          clickable={true}
          setcontact={setcontact} // Ensure `setcontact` expects `ContactData` type
        />
      );
    }
  });

  return (
    <div>
      <div className="today job_grid">
        {job_boxes}
        {job_boxes.length === 0 && (
          <div className="no_result_cont">
            <p className="no_result_message">No Result Found</p>
          </div>
        )}
      </div>
      <PeopleSearch setsearchQuery={setsearchQuery} setkeypress={setkeypress} />
      {/*<Bussadd />*/}
      <Posted_recently
        limit={3}
        placeholder={"You may be interested in"}
        title={""}
        id={""}
      />
    </div>
  );
};

export default Job_grid;
