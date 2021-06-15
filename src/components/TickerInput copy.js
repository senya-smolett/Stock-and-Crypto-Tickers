import React, { useState, useEffect } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import myKeys from "../data/myKeys.json"

const TickerInput = ({ onAddTicker }) => {
    const [tickername, setTickername] = useState('');
    const [symbols, setSymbols] = useState([]);
    var ccxt = require('ccxt')
    const trade = require('wstrade-api');
    console.log(trade);
    const WSApi = "Qb98boAC4T38BV2DyUUWZACNWYiKtQ";
    const questtradetoken = "W_JT23N4iIsZpQHhawlzt8LoPECPWqbc0"

    useEffect(() => {
        const getQT = async () => {
            try {
                const response = await fetch("https://trade-service.wealthsimple.com/auth/login");
                const data = await response.json();
                console.log(data)

            } catch (error) {
                console.log(error.message)
            }
        }


        console.log("z", symbols.length)
        const getSymbols = async () => {
            console.log("3")
            let binance = new ccxt.binance({
                apiKey:
                    myKeys.API_KEY,
                secret:
                    myKeys.SECRET_KEY,
            });
            try {
                //symbols = (await binance.fetchTicker(symbol)).last
                //console.log(await binance.loadMarkets())
                //console.log('a', tickprice)
                //console.log('a', (await binance.fetchBalance()))
                //let finalprice = tickprice.match(/[0]+$/)
                //let finalprice = removeZeroes(tickprice)
                console.log((await binance.loadMarkets()))
                console.log("qwe", (await binance.fetchCurrencies()))
                setSymbols(binance.symbols)
                console.log("a", typeof symbols)
                console.log(symbols)
                console.log(Array.isArray(symbols))
                console.log("b", typeof (await binance.fetchMarkets()).getSymbols)
                //console.log("41x", Date.now())
                //console.log("q", binance.symbols[])
                //setSymbols(finalprice)
            } catch (error) {
                console.log(error)
                //setPrice(error.message)
            }
            console.log("1")

        }
        getQT()
        getSymbols()

    }, [])

    const onSubmit = (e) => {
        console.log(typeof tickername[0])
        e.preventDefault();
        if (!tickername) {
            alert('please add ticker')
            return
        }
        //var tickernamestr = setTickername(tickername)
        //console.log(tickernamestr)
        //tickername = tickername.toUpperCase()
        onAddTicker({ tickername })
        setTickername('')
    }

    return (
        <form className="ticker-search" onSubmit={onSubmit}>
            <div>
                <label className="ticker-search-label" htmlFor="">Ticker name</label>
                <Typeahead
                    clearButton
                    id="selections-example"
                    labelKey="name"
                    onChange={(e) => setTickername(e[0])}
                    options={symbols}
                    placeholder="please choose a crypto..."

                />
                {/* onInputChange={(text, e) => { console.log(text, e); }}
                <input className="ticker-search-input" type="text" placeholder="add ticker" value={tickername.toUpperCase()} onChange={(e) => setTickername(e.target.value)} /> */}
            </div>
            <input type="submit" value="add" />
        </form>

    );
};

export default TickerInput;
