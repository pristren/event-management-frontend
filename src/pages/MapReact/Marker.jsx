import React from "react";

const Marker = ({ text, onClick }) => (
  <div className="wrapper" alt={text} onClick={onClick} />
);

export default Marker;
