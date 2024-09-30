/** @format */

import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import PrimaryDetail from "../primary detail/PrimaryDetail";
import Map from "../map/Map";
import "../costom_styles/jobDetail.css";
import PeopleSearch from "../peopleSeach/PeopleSearch";
import Bussadd from "../bussAdds/Bussadd";
import Contact from "../contact/contact";
import { Link, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import Posted_recently from "../posted_recently/posted_recently";
import "../costom_styles/animation.css"
import Costum_header from "../costum_header/costum_header";
import { MdLocationPin } from "react-icons/md";
const JobDetail_page = ({thumbnail}) => {
  let { id } = useParams()
  let [data, setdata] = useState();
  let [isLoading, setIsloading] = useState(true);
  let[contact,setcontact] = useState(false)
  useEffect(() => {
    let fetchData = async () => {
      try {
        await setIsloading(true)
        await fetch(`http://localhost:3001/alki/jobdetail/${id}`)
          .then((res) => res.json())
          .then((data) => setdata(data));
        setIsloading(false);
      } catch (error) {
        console.log(error)
      } finally {
      }
    };
    fetchData();
  }, [id]);
  
  if (isLoading) {
    return <Loading />;
  } else {
    //////
    function handle_contact(){
      setcontact((prev)=>!prev)
    }
   
    return (
      <>
      {contact&&<Contact 
                setcontact={setcontact}
                price={data.price}
                type={data.type}
                title={data.title}
                contact_num={data.contact_num} 
                />}
        <div className="container_ fadein">
          <Costum_header title={data.title} classN={'header_'} />
          <div className="detail_box">
            <div className="import_information">
              <div className="thumbnail_cont">
                <img  src={data.thumbnail?data.thumbnail:'../default_thumbnail.jpg'} alt="" className=" slidein popin delay thumnail_detail" />
               
                
                <div className="title_price slideinx delayx">
                  <h5><MdLocationPin size={20}/>{data.LGA} {data.state}</h5>
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
              <button className="contact_jobD_btn slideinx delay4" onClick={handle_contact}>Contact now</button>
            </div>
            <div className="other_information">
              <Map lat={data.lat} lon={data.lon} />
             
            </div>
          </div>
          <Posted_recently limit={3} placeholder={'you may be interested in '} state={data.state} type={data.type} title={data.title} id={data.id} reload={isLoading}/>
          <Bussadd />
        </div>
        <Footer />
      </>
    );
  }
};

export default JobDetail_page;
