/** @format */

import React, { useEffect, useState } from "react";
import "./peopleSeach.css";
import { FaSearch } from "react-icons/fa";

// Define the types for the props
interface PeopleSearchProps {
  setsearchQuery: (query: string) => void;
  setdata: React.Dispatch<React.SetStateAction<any[]>>;
  setkeypress: React.Dispatch<React.SetStateAction<string>>;
}

// Define the structure of each search item
interface SearchItem {
  id: string;
  title: string;
}

const PeopleSearch: React.FC<PeopleSearchProps> = ({
  setsearchQuery,
  setkeypress,
}) => {
  const [peoplesearch, setpeoplesearch] = useState<SearchItem[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [query, setqeury] = useState<string>("");

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/alki/peopleSearch`);
        const data = await response.json();
        setpeoplesearch(data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Handle search click
  const handleClick = (text: string) => {
    setsearchQuery(text);
    setkeypress("Enter");
  };

  // Render searches when loading is complete
  if (!isLoading) {
    const searches = peoplesearch.map((text) => (
      <div
        key={text.id}
        className="searches"
        onClick={() => handleClick(text.title)}
      >
        <FaSearch opacity={0.6} /> {text.title}
      </div>
    ));

    return (
      <div className="people_cont">
        <h2 className="peopleAlsoSearch_title">People also search for:</h2>
        <div className="searches_cont">{searches}</div>
      </div>
    );
  }

  return null; // In case loading is still in progress
};

export default PeopleSearch;
