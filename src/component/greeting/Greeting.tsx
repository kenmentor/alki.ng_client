/** @format */

import React from "react";
import "./greeting.css";
import "../costom_styles/animation.css";

const Greeting = (prop) => {
  const { data, total } = prop;
  let number_of_post = data.length;
  return (
    <>
      <div className="greeting_cont popin ">
        <div className="greeting">
          <div className="text">
            <h1>
              {total > 20
                ? `find your perfect job through ${total} uploaded jobs`
                : "Welcome to alki.ng you're among our first 20 users"}
            </h1>
          </div>
          <div className="greeting_sub_tex">Connect with Opportunites</div>
        </div>
      </div>
    </>
  );
};

export default Greeting;
