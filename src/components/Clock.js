import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => {
      tick();
    }, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [date]);

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2 className="clock">{date.toLocaleTimeString()}</h2>
    </div>
  );
};

//ReactDOM.render(<Clock />, document.getElementById("root"));

export default Clock;
