import React from "react";
import Ticker from "./Ticker";
import GridLayout from "react-grid-layout";
import { useState } from "react";
import { useEffect } from "react";


const TickersCopy = ({ tickers, onDelete }) => {
  // const [layout, setLayout] = useState({ i: "0", x: 0, y: 0, w: 0, h: 0 })
  const [layout, setLayout] = useState([])

  useEffect(() => {
    console.log("333", tickers)
    setLayout(getLayout(tickers))
    console.log("3jhdf", layout)
  }, [tickers])

  console.log(tickers);
  // const ticks = () => {
  //   console.log("p")
  //   tickers.map((ticker) => {
  //     return (
  //       <div style={{ backgroundColor: "grey" }} data-grid={{ x: ticker.id, y: 0, w: 1, h: 2 }}>
  //         <Ticker
  //           key={ticker.id}
  //           ticker={ticker}
  //           onDelete={() => onDelete(ticker.id)}
  //         >
  //           {ticker.tickername}
  //         </Ticker>
  //       </div>
  //     )
  //   })
  // }
  const getLayout = (tickers) => {
    var templayout = []
    console.log("asd", tickers.length)
    //console.log(tickers)
    for (let index = 0; index < tickers.length; index++) {
      const element = tickers[index];
      //const id = toString(element.id)
      const id = element.id.toString()
      console.log(toString(element.id), element.id, typeof element.id, typeof toString(element.id), id)
      var tempobj = { i: id, x: element.position[0], y: element.position[1], w: 2, h: 5 }
      templayout.push(tempobj)
      console.log("templayout", templayout)
    }
    //setLayout([1, 2, 3])
    console.log("123123", templayout)
    return templayout
  }
  //setLayout(getLayout())

  const onLayoutChange = (layout) => {
    console.log(layout)
    setLayout(layout)
  }

  return (
    <>

      {
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200} layout={layout} onLayoutChange={layout => onLayoutChange(layout)}>
          {
            tickers.map((ticker) => {
              return (
                <div key={ticker.id} style={{ backgroundColor: "grey" }}>
                  <Ticker
                    key={ticker.id}
                    ticker={ticker}

                    onDelete={() => onDelete(ticker.id)}
                  >
                    {ticker.tickername}
                  </Ticker>
                </div>
              )
            })
          }
        </GridLayout>
      }


      {/* <GridLayout className="layout" cols={12} rowHeight={30} width={1200} layout={layout}>
        {
          tickers.map((ticker) => {
            return (
              <div key={ticker.id} style={{ backgroundColor: "grey" }}>
                <Ticker
                  key={ticker.id}
                  ticker={ticker}
                  onDelete={() => onDelete(ticker.id)}
                >
                  {ticker.tickername}
                </Ticker>
              </div>
            )
          })
        }
      </GridLayout> */}
      {/* <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <div key="a" style={{ backgroundColor: "grey" }} data-grid={{ x: 0, y: 0, w: 2, h: 6 }}>a</div>
        <div key="b" style={{ backgroundColor: "grey" }} data-grid={{ x: 1, y: 0, w: 2, h: 2, minW: 2, maxW: 4 }}>b</div>
        <div key="c" style={{ backgroundColor: "grey" }} data-grid={{ x: 2, y: 0, w: 2, h: 2 }}>c</div>
      </GridLayout> */}
    </>
  );
};

export default TickersCopy;
