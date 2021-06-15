import React from "react";
import TickerAPIData from "./TickerAPIData";
import { FaTimes } from "react-icons/fa";

const Ticker = ({ ticker, onDelete }) => {
  return (
    <div className="ticker-box">
      <div className="ticker-name-n-delete">
        <h3>{ticker.tickername}</h3>
        <FaTimes className="delete-btn" onClick={onDelete}></FaTimes>
      </div>
      <TickerAPIData
        tickername={ticker.tickername}
      ></TickerAPIData>

    </div>
  );
};

export default Ticker;
