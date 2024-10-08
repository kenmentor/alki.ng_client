/** @format */

import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import PrimaryDetail from "../primary detail/PrimaryDetail";
import Map from "../map/Map";
import "../costom_styles/jobDetail.css";
import PeopleSearch from "../peopleSeach/PeopleSearch";
import Contact from "../contact/contact";
import { Link, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import Posted_recently from "../posted_recently/posted_recently";
import "../costom_styles/animation.css";
import Costum_header from "../costum_header/costum_header";
import { MdLocationPin } from "react-icons/md";

const JobDetailPage: React.FC<{ thumbnail: string }> = ({ thumbnail }) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contactVisible, setContactVisible] = useState<boolean>(false);
  const [fullView, setFullView] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        alert("fetching date");
        const response = await fetch(
          `http://localhost:3001/alki/jobdetail/${id}`
        );
        const result = await response.json();
        setData(result);
        console.log(result);
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
                  alt=""
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
          id={data.id}
          reload={isLoading}
        />
      </div>
      <Footer />
    </>
  );
};

export default JobDetailPage;
