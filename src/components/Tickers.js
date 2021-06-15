import React from "react";
import Ticker from "./Ticker";

const Tickers = ({ tickers, onDelete }) => {
  return (
    <>
      {/* {tickers.map((ticker) => (
        <Ticker
          key={ticker.id}
          ticker={ticker}
          onDelete={() => onDelete(ticker.id)}
        >
          {ticker.tickername}
        </Ticker>
      ))} */}
    </>
  );
};

export default Tickers;
