/** @format */

import React, { memo, useEffect, useMemo, useState } from "react";
import Header from "../header/header";
import Job_grid from "../job-grid/job_grid";
import Footer from "../footer/footer";
import Greeting from "../greeting/Greeting";
import Loading from "../loading/Loading";
import "../costom_styles/costom.css";
import Contact from "../contact/contact";
import { MdCancel } from "react-icons/md";
import "../peopleSeach/peopleSeach.css";
const Home_page = (props) => {
  let { mode, setmode } = props;
  let [data, setdata] = React.useState([]);
  let [loading, setloading] = useState(true);
  let [side_buttons, setside_buttons] = React.useState({
    create: false,
    filter: false,
    more: false,
  });
  let [searchQuery, setsearchQuery] = React.useState("");
  let [filter_input, setfilter_input] = React.useState({
    jobtype: "",
    max_price: 100000000000000000000,
    min_price: 0,
    joblocation: "",
  });
  let [keypress, setkeypress] = useState("ee");
  let [pageErro, setpageErro] = useState(false);
  let [contact, setcontact] = useState({ title: "saswssd" });
  let [total, settotal] = useState(0);
  let [keyword, setkeyword] = useState("");
  function fetchdata(min) {
    useEffect(() => {
      let fetchData = async () => {
        try {
          fetch(`http://localhost:3001/alki/get_jobs/?search=${searchQuery}`)
            .then((res) => res.json())
            .then((response) => {
              setdata(response.data);
              settotal(response.totalJob);
              setkeyword(response.search_message);
            })
            .then(() => setloading(false))
            .then(() => setkeypress("key"));
        } catch (error) {
          await alert(error);
          setpageErro(true);
          setloading(false);
        } finally {
        }
      };
      fetchData();
    }, [keypress === "Enter"]);
  }
  fetchdata(filter_input.min_price);

  if (loading) {
    return <Loading />;
  }
  if (pageErro) {
    return (
      <h2>
        and erro occured <a href="/">go to home</a>
      </h2>
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  let filteredata = data;

  function filter_job() {
    let { max_price, min_price, jobtype, joblocation } = filter_input;

    filteredata = filteredata.filter((job) => {
      let price = parseInt(job.price);
      return (
        max_price >= price &&
        min_price <= price &&
        job.type.toLowerCase().includes(jobtype.toLowerCase()) &&
        job.state.toLowerCase().includes(joblocation.toLowerCase())
      );
    });
  }
  filter_job();

  function resetfilter(e) {
    const field = e.target.className.baseVal;
    if (field == "price") {
      setfilter_input((prev) => {
        return { ...prev, max_price: 100000000000000000000, min_price: 0 };
      });
      return "complete";
    }
    setfilter_input((prev) => {
      return { ...prev, [field]: "" };
    });
  }

  return (
    <>
      <div className="container">
        <>
          <Header
            setsearchQuery={setsearchQuery}
            searchQuery={searchQuery}
            side_buttons={side_buttons}
            setside_buttons={setside_buttons}
            setfilter_input={setfilter_input}
            filter_input={filter_input}
            mode={mode}
            setmode={setmode}
            setkeypress={setkeypress}
          />

          <Greeting data={data} mode={mode} setmode={setmode} total={total} />

          <div className="applyed_fiters">
            {(filter_input.jobtype ||
              filter_input.joblocation ||
              !(
                filter_input.max_price === 100000000000000000000 &&
                filter_input.min_price === 0
              ) ||
              filter_input.joblocation) && (
              <>
                {filter_input.jobtype && (
                  <div className="searches">
                    {filter_input.jobtype}{" "}
                    <MdCancel
                      onClick={resetfilter}
                      size={20}
                      className="jobtype"
                    />
                  </div>
                )}
                {filter_input.joblocation && (
                  <div className="searches">
                    {filter_input.joblocation}{" "}
                    <MdCancel
                      onClick={resetfilter}
                      size={20}
                      className="joblocation"
                    />
                  </div>
                )}
                {!(
                  filter_input.max_price === 100000000000000000000 &&
                  filter_input.min_price === 0
                ) && (
                  <div className="searches">
                    {filter_input.max_price} - {filter_input.min_price}{" "}
                    <MdCancel
                      onClick={resetfilter}
                      size={20}
                      className="price"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="total_count">
            <span className="price">{filteredata.length}</span>
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
          <Job_grid
            filteredata={filteredata}
            setsearchQuery={setsearchQuery}
            setkeypress={setkeypress}
            setcontact={setcontact}
          />
        </>
      </div>
      <Footer />
    </>
  );
};

export default Home_page;
