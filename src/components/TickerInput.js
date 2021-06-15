import React, { useState, useEffect } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import myKeys from "../data/myKeys.json"

const TickerInput = ({ onAddTicker }) => {
    const [tickername, setTickername] = useState('');
    const [symbols, setSymbols] = useState([]);
    var ccxt = require('ccxt')

    useEffect(() => {

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
                console.log((await binance.loadMarkets()))
                console.log("qwe", (await binance.fetchCurrencies()))
                setSymbols(binance.symbols)
                console.log("a", typeof symbols)
                console.log(symbols)
                console.log(Array.isArray(symbols))
                console.log("b", typeof (await binance.fetchMarkets()).getSymbols)
            } catch (error) {
                console.log(error)
            }
            console.log("1")

        }
        getSymbols()

    }, [])

    const onSubmit = (e) => {
        console.log(typeof tickername[0])
        e.preventDefault();
        if (!tickername) {
            alert('please add ticker')
            return
        }
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
            </div>
            <input type="submit" value="add" />
        </form>

    );
};

export default TickerInput;
