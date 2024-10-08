/** @format */

import React, { useEffect, useState, useCallback, memo } from "react";
import Header from "../header/header";
import Job_grid from "../job-grid/job_grid";
import Footer from "../footer/footer";
import Greeting from "../greeting/Greeting";
import Loading from "../loading/Loading";
import Contact from "../contact/contact";
import { MdCancel } from "react-icons/md";
import "../peopleSeach/peopleSeach.css";
import "../costom_styles/costom.css";

// Define the types for the props
interface HomePageProps {
  mode: string;
  setmode: React.Dispatch<React.SetStateAction<string>>;
}

interface FilterInput {
  jobtype: string;
  max_price: number;
  min_price: number;
  joblocation: string;
}

interface Job {
  price: string;
  type: string;
  state: string;
}

const HomePage: React.FC<HomePageProps> = ({ mode, setmode }) => {
  const [data, setdata] = useState<Job[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [side_buttons, setside_buttons] = useState({
    create: false,
    filter: false,
    more: false,
  });
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [filter_input, setfilter_input] = useState<FilterInput>({
    jobtype: "",
    max_price: Number.MAX_SAFE_INTEGER,
    min_price: 0,
    joblocation: "",
  });
  const [keypress, setkeypress] = useState<string>("enter");
  const [pageErro, setpageErro] = useState<boolean>(false);
  const [contact, setcontact] = useState({ title: "saswssd" });
  const [total, settotal] = useState<number>(0);
  const [keyword, setkeyword] = useState<string>("");

  // Fetch data with useEffect

  function fetchdata() {
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
  fetchdata();

  if (loading) {
    return <Loading />;
  }

  if (pageErro) {
    return (
      <h2>
        An error occurred. <a href="/">Go to home</a>
      </h2>
    );
  }

  // Filter jobs
  const filterJob = () => {
    const { max_price, min_price, jobtype, joblocation } = filter_input;

    return data.filter((job) => {
      const price = parseInt(job.price);
      return (
        price <= max_price &&
        price >= min_price &&
        job.type.toLowerCase().includes(jobtype.toLowerCase()) &&
        job.state.toLowerCase().includes(joblocation.toLowerCase())
      );
    });
  };

  const filteredData = filterJob();

  // Reset filter
  const resetFilter = (e: React.MouseEvent<SVGElement>) => {
    const field = e.currentTarget.className.baseVal;

    if (field === "price") {
      setfilter_input((prev) => ({
        ...prev,
        max_price: Number.MAX_SAFE_INTEGER,
        min_price: 0,
      }));
      return "complete";
    }

    setfilter_input((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <>
      <div className="container">
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
              filter_input.max_price === Number.MAX_SAFE_INTEGER &&
              filter_input.min_price === 0
            ) ||
            filter_input.joblocation) && (
            <>
              {filter_input.jobtype && (
                <div className="searches">
                  {filter_input.jobtype}{" "}
                  <MdCancel
                    onClick={resetFilter}
                    size={20}
                    className="jobtype"
                  />
                </div>
              )}
              {filter_input.joblocation && (
                <div className="searches">
                  {filter_input.joblocation}{" "}
                  <MdCancel
                    onClick={resetFilter}
                    size={20}
                    className="joblocation"
                  />
                </div>
              )}
              {!(
                filter_input.max_price === Number.MAX_SAFE_INTEGER &&
                filter_input.min_price === 0
              ) && (
                <div className="searches">
                  {filter_input.max_price} - {filter_input.min_price}{" "}
                  <MdCancel
                    color="white"
                    onClick={resetFilter}
                    size={20}
                    className="price"
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="total_count">
          <span className="price">{filteredData.length}</span>
        </div>

        {contact && contact.chat_state && (
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
          filteredData={filteredData}
          setsearchQuery={setsearchQuery}
          setkeypress={setkeypress}
          setcontact={setcontact}
        />
      </div>

      <Footer />
    </>
  );
};

export default memo(HomePage);
