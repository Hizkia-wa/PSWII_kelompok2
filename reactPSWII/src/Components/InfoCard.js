import React from "react";
import "./InfoCard.css";

const InfoCard = ({ title, value, icon, color }) => {
  return (
    <div className={`info-card ${color}`}>
      <div className="icon">{icon}</div>
      <div className="content">
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default InfoCard;
