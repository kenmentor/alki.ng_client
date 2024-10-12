/** @format */

import React from "react";
import "./primaryDetail.css";
import { MdContactPhone, MdDateRange, MdDescription } from "react-icons/md";
import { FaAddressBook, FaCity, FaTypo3 } from "react-icons/fa";

// Define the type for props
interface PrimaryDetailProps {
  description: string;
  price: number; // Assuming price is a number, change this if needed
  state: string;
  type: string;
  title: string;
  LGA: string;
  contact_num: string;
  date: string;
}

const PrimaryDetail: React.FC<PrimaryDetailProps> = ({
  description,
  state,
  type,
  LGA,
  contact_num,
  date,
}) => {
  // Type the arguments for the function
  function formatDate(date: string, num: number): string {
    if (date) {
      let formattedData: string[] = [];
      for (let i = 0; i < num; i++) {
        formattedData.push(date[i]);
      }
      return formattedData.join("");
    }
    return "date not tracted";
  }

  return (
    <>
      <div className="primary_details slideinx delay2">
        <h2> Primary Detail </h2>
        <ul>
          <li>
            <span className="title">
              <FaAddressBook opacity={0.5} /> Address____
            </span>
            {LGA}
          </li>
          <li>
            <span className="title">
              <FaCity opacity={0.5} /> State_______
            </span>
            {state}
          </li>
          <li>
            <span className="title">
              <FaTypo3 opacity={0.5} /> Type_________
            </span>
            {type}
          </li>
          <li>
            <span className="title">
              <MdContactPhone opacity={0.5} /> Contact number_
            </span>
            {contact_num.length === 13 ? `+${contact_num}` : contact_num}
          </li>
          <li>
            <span className="title">
              <MdDateRange opacity={0.5} /> Posted
            </span>
            : {formatDate(date, 10)}
          </li>
        </ul>
      </div>
      <div className="primary_details slideinx delay3">
        <h2>
          Description <MdDescription opacity={0.5} />
        </h2>
        <ul>
          <li>{description}</li>
        </ul>
      </div>
    </>
  );
};

export default PrimaryDetail;
