import React from 'react'
import { useEffect, useState } from 'react';


const TickerChangePercent = ({tickername}) => {
    const [onedaychange, setOnedaychange] = useState("-.--")
    const [oneweekchange, setOneweekchange] = useState("-.--")
    const [onemonthchange, setOnemonthchange] = useState("-.--")
    var ccxt = require('ccxt')

    useEffect(() => {

        const getPercentage = async (tickprice) => {
            let binance = new ccxt.binance({
                apiKey:
                    myKeys.API_KEY,
                secret:
                    myKeys.SECRET_KEY,
            });
            try {
                
            } 
            catch (error) {
                console.log(error)
                setPrice(error.message)
            }
        }

        var timerID = setInterval(() => {
          tick();
        }, 10000);


        return function cleanup() {
          clearInterval(timerID);
        };

    }, []);
    

    return (
        <div>

        </div>
    )
}

export default TickerChangePercent


