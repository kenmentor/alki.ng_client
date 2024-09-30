/** @format */

import React from "react";
import "./primaryDetail.css";
import { MdContactPhone, MdDateRange, MdDescription, MdDetails, MdMergeType } from "react-icons/md";
import { FaAddressBook, FaCity, FaTypo3 } from "react-icons/fa";

const PrimaryDetail = (props) => {
  let { description, price, state, type, title, LGA, contact_num,date} = props;
  function formatdate(date,num){
    let formated_data =[]
    for(let i=0; i<num;i++){
      formated_data.push(date[i])
    }
    return(formated_data.join(''))
  }
  console.log()
  return (
    <>
    
    <div className="primary_details slideinx delay2">
      <h2> Primary Detail </h2>
      <ul>
        
        
        <li>
          <span className="title"> <FaAddressBook opacity={0.5}/> Address____</span>
          {LGA}
        </li>
        <li>
          <span className="title"><FaCity opacity={0.5}/> State_______</span>
          {state}
        </li>

        <li>
          <span className="title"> <FaTypo3 opacity={0.5}/> Type_________ </span>
          {type}
        </li>
        <li>
          <span className="title"> <MdContactPhone opacity={0.5}/> Contact number_</span>
          {contact_num.length===13?'+'+contact_num:contact_num}
        </li>
         
        <li><span className="title"><MdDateRange opacity={0.5}/> posted</span>: {formatdate(date,10)}</li>
      </ul>
    </div>
    <div className="primary_details slideinx delay3">
      <h2> Description <MdDescription opacity={0.5}/></h2>
      <ul>
        <li>
        {description}
        </li>
        </ul>
      </div>
    </>
  );
};

export default PrimaryDetail;
