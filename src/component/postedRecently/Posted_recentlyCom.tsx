/** @format */

import React, { useEffect, useState } from "react";
import "../job-grid/job-grid.css";
import "./Posted_recently.css";
import Job_box_p from "../jobs_box_p/Job_box_p";
import Job_box from "../Jobs_box/job_box";
import Contact from "../contact/contact";
import { FaArrowDown } from "react-icons/fa";

// Define interface for component props
interface PostedRecentlyProps {
  limit: number;
  placeholder: string;
  title?: string;
  state?: string;
  type?: string;
  id?: string;
}

// Define interface for job data
interface JobData {
  _id: string;
  thumbnail: string;
  country: string;
  state: string;
  date: string;
  description: string;
  localgovement: string;
  title: string;
  price: number;
  type: string;
  contact_num?: string;
}

// Define interface for contact state
interface ContactData {
  title: string;
  contact_num?: string;
  chat_state?: boolean;
}

const Posted_recently: React.FC<PostedRecentlyProps> = ({
  limit,
  placeholder,
  title,
  state,
  type,
  id,
}) => {
  const [data, setData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<ContactData>({ title: "saswssd" });
  const [serverLimit, setServerLimit] = useState(limit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/alki/get_posted_recently/?limit=${3}&title=${title}&state=${state}&type=${type}&id=${id}`
        );
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    fetchData();
  }, [serverLimit, title, state, type, id]);

  const loadMore = () => {
    setServerLimit((prev) => prev + 3);
  };

  const postedRecently = data.map((job) => {
    if (job.type === "professional_job") {
      return (
        <Job_box_p
          thumbnail={job.thumbnail}
          country={job.country}
          state={job.state}
          data={job.date}
          description={job.description}
          localgovement={job.localgovement}
          title={job.title}
          price={job.price}
          id={job._id}
          key={job._id}
          clickable={true}
        />
      );
    } else {
      return (
        <Job_box
          thumbnail={job.thumbnail}
          country={job.country}
          state={job.state}
          data={job.date}
          description={job.description}
          localgovement={job.localgovement}
          title={job.title}
          price={job.price}
          type={job.type}
          contact_num={job.contact_num}
          id={job._id}
          key={job._id}
          clickable={true}
          setcontact={setContact}
        />
      );
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="today_job_title_cont">
        <h1 className="today_jo_title">{placeholder}</h1>
      </div>
      {contact.chat_state && (
        <Contact
          setcontact={setContact}
          price={666}
          type={"eee"}
          title={contact.title}
          contact_num={contact.contact_num}
          home={true}
        />
      )}
      <div className="today job_grid">{postedRecently}</div>
      {title && (
        <div className="more_cont">
          <button onClick={loadMore}>
            See more <FaArrowDown />
          </button>
        </div>
      )}
    </div>
  );
};

export default Posted_recently;
