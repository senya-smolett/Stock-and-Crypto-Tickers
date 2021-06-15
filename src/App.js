import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Clock from "./components/Clock";
import TickerInput from "./components/TickerInput";
import Tickers from "./components/Tickers";
import TickersCopy from "./components/TickersCopy";

function App() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    const getTickers = async () => {
      const tickersFromServer = await fetchTickers();
      setTickers(tickersFromServer);
    };
    getTickers();
  }, []);

  //Fetch Tickers
  const fetchTickers = async () => {
    const res = await fetch("http://localhost:5000/tickers");
    const data = await res.json();
    console.log(data);
    return data;
  };

  const deleteTicker = async (id) => {
    await fetch(`http://localhost:5000/tickers/${id}`, {
      method: "DELETE",
    });
    setTickers(tickers.filter((ticker) => ticker.id !== id));
  };

  //Add Ticker
  const addTicker = async (ticker) => {
    const res = await fetch("http://localhost:5000/tickers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(ticker),
    });
    const data = await res.json();
    setTickers([...tickers, data]);
  };

  return (
    <>
      <Container className="title-container container-fluid">
        <Row>
          <Col>
            <TickerInput onAddTicker={addTicker} />
          </Col>
          <Col>
            <Clock />
          </Col>
        </Row>
      </Container>
      <Tickers tickers={tickers} onDelete={deleteTicker}></Tickers>
      <TickersCopy tickers={tickers} onDelete={deleteTicker}></TickersCopy>
    </>
  );
}

export default App;
