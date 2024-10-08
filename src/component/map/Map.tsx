/** @format */

import React from "react";
import "./map.css";

interface MapProps {
  lat: number;
  lon: number;
}

const Map: React.FC<MapProps> = ({ lat, lon }) => {
  return (
    <div className="map">
      <h3>
        Coming soon
        {/* Uncomment the lines below to display latitude and longitude */}
        {/* {lat}, {lon} */}
      </h3>
    </div>
  );
};

export default Map;
