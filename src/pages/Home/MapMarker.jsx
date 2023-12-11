import React from "react";

const MapMarker = ({ text }) => {
  return (
    <div className="marker" title={text} onClick={() => alert("some")}></div>
  );
};

export default MapMarker;
