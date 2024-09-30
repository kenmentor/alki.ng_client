/** @format */
import React, { useEffect, useState } from "react";
import "./peopleSeach.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const PeopleSearch = (props) => {
  let {setsearchQuery,setdata,setkeypress} = props
  let [peoplesearch, setpeoplesearch] = useState([]);
  let [isLoading, setIsloading] = useState(true);
  let[query,setqeury]=useState('')
///////////////////////////
  useEffect(() => {
    let fetchData = async () => {

      try {
        await fetch(`http://localhost:3001/alki/peopleSearch`)
          .then((res) => res.json())
          .then((data) => setpeoplesearch(data));
        setIsloading(false);
        console.log((peoplesearch))
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchData();
  }, []);
  
  function handleClick(text){
    setsearchQuery(text)
    setkeypress('Enter')
  }
/////////////////////////////////
  if (!isLoading) {
    let seaerches = peoplesearch.map((text) => {
      return (
        
          <div key ={text.id} className="searches" onClick={()=>handleClick(text.title)}>
          
            <FaSearch opacity={0.6}/>
            {text.title}
          </div>
          
      );
    });
    return (
      <div className="people_cont">
        <h2 className="peopleAlsoSearch_title">people also search for:</h2>
        <div className="searches_cont">{seaerches}</div>
      </div>
    );
  }
};

export default PeopleSearch;
