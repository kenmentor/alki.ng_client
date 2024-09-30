/** @format */

import React from "react";
import Home_page from "./component/pages/Home_page";
import Create from "./component/create/create";
import JobDetail_page from "./component/pages/jobDetail_page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./component/about/About";
import Erro404 from "./component/erro page/404erro";
import Termscondition from "./component/about/termscondition";
const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/jobdetail/:id" element={<JobDetail_page />} />
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Home_page />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/terms" element={<Termscondition/>}/>
          <Route path="*" element={<Erro404/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
