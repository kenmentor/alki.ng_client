/** @format */

import React, { useState, useCallback, ChangeEvent } from "react";
import "./filter.css";
import { MdFilterCenterFocus } from "react-icons/md";
import states from "../../local_data/states";

// Define the props and filter input interface
interface FilterProps {
  isfilter: boolean;
  toggle_create: () => void;
  set_search: (search: string) => void;
  filter: boolean;
  setfilter_input: (filter: FilterInput) => void;
  filter_input: FilterInput;
}

interface FilterInput {
  jobtype?: string;
  max_price?: number;
  min_price?: number;
  joblocation?: string;
}

const Filter: React.FC<FilterProps> = ({
  isfilter,
  toggle_create,
  set_search,
  filter,
  setfilter_input,
  filter_input,
}) => {
  const [moreFilter, setmoreFilter] = useState(false);

  // Debounced job type handler
  const handle_jobtype = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setfilter_input((predata: FilterInput) => ({
        ...predata,
        jobtype: e.target.value,
      }));
    },
    [setfilter_input]
  );

  const handle_joblocation = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setfilter_input((predata: FilterInput) => ({
        ...predata,
        joblocation: e.target.value,
      }));
    },
    [setfilter_input]
  );

  const handle_jobprice = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value);
      const priceRanges = [
        { min_price: 1, max_price: 1000000000000000 },
        { min_price: 1000, max_price: 10000 },
        { min_price: 10000, max_price: 20000 },
        { min_price: 20000, max_price: 30000 },
        { min_price: 30000, max_price: 40000 },
        { min_price: 40000, max_price: 50000 },
        { min_price: 50000, max_price: 60000 },
        { min_price: 60000, max_price: 70000 },
        { min_price: 70000, max_price: 80000 },
        { min_price: 100000, max_price: 10000000000 },
      ];

      setfilter_input((predata: FilterInput) => ({
        ...predata,
        ...priceRanges[value],
      }));
    },
    [setfilter_input]
  );

  const handle_price = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setfilter_input((prev: FilterInput) => ({
        ...prev,
        [name]: Number(value),
      }));
    },
    [setfilter_input]
  );

  // Toggle more filters
  const toggle_more_filter = useCallback(() => {
    setmoreFilter((prev) => !prev);
  }, []);

  // Handle float button
  const handlefloat = useCallback(() => {
    setmoreFilter(false);
    setfilter_input({
      max_price: 100000000000000000000,
      min_price: 0,
    });
  }, [setfilter_input]);

  // Memoize stateElement to avoid recalculating every render
  const stateElement = React.useMemo(
    () =>
      states.map((data, key) => (
        <option value={data} key={key}>
          {" "}
        </option>
      )),
    []
  );

  return (
    <>
      <button
        className="float_btn"
        onClick={handlefloat}
        style={!moreFilter ? { transform: "scale(0)" } : {}}
      >
        x
      </button>
      <div className="filter_cont">
        <div
          className="filter_selector"
          style={!moreFilter ? { display: "none" } : {}}
        >
          <div className="min_cont price">
            <p>minimum price</p>
            <input
              type="number"
              placeholder="min - price"
              name="min_price"
              value={`${filter_input.min_price || ""}`}
              onChange={handle_price}
            />
          </div>
          <div className="maximum price">
            <p>maximum price</p>
            <input
              type="number"
              placeholder="max - price"
              value={`${filter_input.max_price || ""}`}
              name="max_price"
              onChange={handle_price}
            />
          </div>
        </div>
        <div
          className="filter"
          style={!filter ? { top: "-90px", zIndex: "0" } : {}}
        >
          <button className="cancel" onClick={toggle_create}>
            x
          </button>
          <h2>filter search</h2>
          <div className="component">
            <div className="job_type">
              <select
                name="job_type_input"
                id="job_type_input"
                onChange={handle_jobtype}
                className="filter_option"
              >
                <option value="">All Type Of Job</option>
                <option value="profesional_job">professional jobs</option>
                <option value="casual_job">casual jobs</option>
                <option value="remote_job">remote jobs</option>
                <option value="partime_job">Part time jobs</option>
                <option value="fulltime_job">Full time jobs</option>
              </select>
            </div>
            <div className="job_price">
              <select
                className="filter_option"
                name="job_price_input"
                id="job_price_input"
                onChange={handle_jobprice}
                onClick={toggle_more_filter}
              >
                <option value="0">All Job Prices</option>
                <option value="1">1,000 - 10,000</option>
                <option value="2">10,000 - 20,000</option>
                <option value="3">20,000 - 30,000</option>
                <option value="4">30,000 - 40,000</option>
                <option value="5">40,000 - 50,000</option>
                <option value="6">50,000 - 60,000</option>
                <option value="7">70,000 - 80,000</option>
                <option value="8">90,000 - 100,000</option>
                <option value="9">above 100k</option>
              </select>
            </div>

            <div className="job_location">
              <input
                list="locations"
                name="job_location_input"
                id="job_location_input"
                onChange={handle_joblocation}
                className="filter_option"
                placeholder="Location"
              />
            </div>

            <datalist id="locations">{stateElement}</datalist>
          </div>
        </div>
      </div>
      <div
        className="backdrop"
        style={filter ? { height: "100vh" } : {}}
        onClick={toggle_create}
      ></div>
    </>
  );
};

export default Filter;
