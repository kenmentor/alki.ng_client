/** @format */

import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import PrimaryDetail from "../primary detail/PrimaryDetail";
import Map from "../map/Map";
import "../costom_styles/jobDetail.css";
import PeopleSearch from "../peopleSeach/PeopleSearch";
import Contact from "../contact/contact";
import { Link, useParams } from "react-router-dom";
import Loading from "../LoadingF/Loading";
import Posted_recently from "../postedRecently/Posted_recentlyCom";
import "../costom_styles/animation.css";
import Costum_header from "../costum_header/costum_header";
import { MdLocationPin } from "react-icons/md";
import ErroReload from "../erro page/erroReload";

// Define the shape of the data returned by the API
interface JobData {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  state: string;
  LGA: string;
  type: string;
  contact_num: string;
  createdAt: string;
  lat: number;
  lon: number;
}

// Define props for the component
interface JobDetailPageProps {
  thumbnail?: string; // Optional because you're using a default thumbnail if not provided
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ thumbnail }) => {
  const { id } = useParams<{ id: string }>(); // Typing for URL parameters
  const [data, setData] = useState<JobData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contactVisible, setContactVisible] = useState<boolean>(false);
  const [fullView, setFullView] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3001/alki/jobdetail/${id}`
        );
        const result: JobData = await response.json(); // Ensure correct type
        setData(result);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleContactToggle = () => {
    setContactVisible((prev) => !prev);
  };

  const toggleFullView = () => {
    setFullView((prev) => !prev);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErroReload />;
  }

  return (
    <>
      {contactVisible && (
        <Contact
          setContact={setContactVisible}
          price={data.price}
          type={data.type}
          title={data.title}
          contact_num={data.contact_num}
        />
      )}
      <div className="container_ fadein">
        <Costum_header title={data.title} classN="header_" />
        <div className="detail_box">
          <div className="import_information">
            <div className="thumbnail_cont">
              <div
                className={`${fullView ? "fullview" : "thumnail_img"}`}
                onClick={toggleFullView}
              >
                <img
                  src={data.thumbnail || "/default_thumbnail.jpg"}
                  alt={data.title}
                  className={`slidein popin delay ${
                    fullView ? "thumbnail_detail_fullview" : "thumnail_detail"
                  }`}
                  onDoubleClick={toggleFullView}
                />
              </div>
              <div className="title_price slideinx delayx">
                <h5>
                  <MdLocationPin size={20} />
                  {data.LGA} {data.state}
                </h5>
                <h2>{data.title}</h2>
                <p>${data.price}</p>
              </div>
            </div>

            <PrimaryDetail
              description={data.description}
              price={data.price}
              state={data.state}
              type={data.type}
              title={data.title}
              LGA={data.LGA}
              contact_num={data.contact_num}
              date={data.createdAt}
            />
            <div className="contact_btn_cont">
              <button
                className="contact_jobD_btn slideinx delay4"
                onClick={handleContactToggle}
              >
                Contact now
              </button>
            </div>
          </div>
          <div className="other_information">
            <Map lat={data.lat} lon={data.lon} />
          </div>
        </div>
        <Posted_recently
          limit={3}
          placeholder="You may be interested in"
          state={data.state}
          type={data.type}
          title={data.title}
          id={data._id}
          reload={isLoading}
        />
      </div>
      <Footer />
    </>
  );
};

export default JobDetailPage;
