/** @format */

import React, { useState, useEffect } from "react";
import "./bussAdds.css";
const Bussadd = () => {
  let [loading, setloading] = useState(true);
  let [data, setdata] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        fetch("http://localhost:3001/alki/get_bussAdd")
          .then((res) => res.json())
          .then((data) => setdata(data));
          alert(res.ok);
      } catch (error) {
        
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);
  let bussadd = data.map((data) => {
    return (
      <div className="bussAdd_adds" key={data.id}>
        <img src="/Spinner-3 (1).gif" alt="" />
        <p>hello</p>
      </div>
    );
  });
  if (!loading) {
    return (
      <div className="Bussadd">
        <h2 className="Bussadd_title">startups</h2>
        <div className="bussAdd_grid">
          <div className="bussAdd_adds creatAdd">
            advertize your bussiness here for free
          </div>
          {bussadd}
        </div>
      </div>
    );
  }
};

export default Bussadd;
