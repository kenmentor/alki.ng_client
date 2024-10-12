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
import ErroReload from "../erro page/erroReload";

// Define the types for the props
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

interface ContactData {
  title: string;
  contact_num: string;
  chat_state?: boolean;
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [side_buttons, setSideButtons] = useState({
    create: false,
    filter: false,
    more: false,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter_input, setFilterInput] = useState<FilterInput>({
    jobtype: "",
    max_price: Number.MAX_SAFE_INTEGER,
    min_price: 0,
    joblocation: "",
  });
  const [keypress, setKeypress] = useState<string>("enter");
  const [pageErro, setPageErro] = useState<boolean>(false);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");

  // Fetch data with useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/alki/get_jobs/?search=${searchQuery}`
        );
        const result = await response.json();
        setData(result.data);
        setTotal(result.totalJob);
        setKeyword(result.search_message);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPageErro(true);
      } finally {
        setLoading(false);
        setKeypress("key");
      }
    };

    fetchData();
  }, [searchQuery]);

  if (pageErro) {
    return <ErroReload />;
  }

  if (loading) {
    return <Loading />;
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
      setFilterInput((prev) => ({
        ...prev,
        max_price: Number.MAX_SAFE_INTEGER,
        min_price: 0,
      }));
      return "complete";
    }

    setFilterInput((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <>
      <div className="container">
        <Header
          setsearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          side_buttons={side_buttons}
          setside_buttons={setSideButtons}
          setfilter_input={setFilterInput}
          filter_input={filter_input}
          setkeypress={setKeypress}
        />

        <Greeting total={total} />

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
            setContact={setContact}
            price={666}
            type={"eee"}
            title={contact.title}
            contact_num={contact.contact_num}
            home={true}
          />
        )}

        <Job_grid
          filteredData={filteredData}
          setsearchQuery={setSearchQuery}
          setkeypress={setKeypress}
          setContact={setContact}
        />
      </div>

      <Footer />
    </>
  );
};

export default memo(HomePage);
