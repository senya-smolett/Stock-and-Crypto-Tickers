import React from 'react'
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import myKeys from "../data/myKeys.json"
import fiatCurrencies from "../data/fiatCurrencies.json"
import TickerChangePercent from "./TickerChangePercent";

const TickerAPIData = ({ tickername }) => {
    const [price, setPrice] = useState("...")
    const [onedaychange, setOnedaychange] = useState("-.--")
    const [oneweekchange, setOneweekchange] = useState("-.--")
    const [onemonthchange, setOnemonthchange] = useState("-.--")
    const [symbol, setSymbol] = useState("")

    var ccxt = require('ccxt')
    // const finnhub = require('finnhub');
    // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    // api_key.apiKey = "brodjmfrh5r8qo238g3g" // Replace this
    // const finnhubClient = new finnhub.DefaultApi()


    //console.log(trade.quotes.get("AAPL"))
    //setSymbol(tickername)
    //console.log(symbol)
    //console.log(ticker.tickername)

    // const removeZeroes = (rawprice) => {
    //     var tempprice = rawprice;
    //     var splitprice = rawprice.split("")
    //     //console.log('b')
    //     //console.log(rawprice, "s")
    //     //console.log(rawprice.length)
    //     //console.log(splitprice)
    //     //rawprice = rawprice.toLocaleString('decimal', { minimumFractionDigits: 8 })
    //     for (let i = splitprice.length - 1; i >= 0; i--) {
    //         const element = splitprice[i];
    //         //console.log('a')
    //         //console.log(splitprice[i])
    //         if (element == '0') {
    //             console.log(i, element, tempprice.slice(0, -1))
    //             tempprice = tempprice.slice(0, -1)
    //         } else {
    //             break;
    //         }
    //     }
    //     //console.log(rawprice)
    //     return tempprice
    // }

    const removeZeroes = (rawprice, name) => {
        var tempprice = rawprice
        //console.log(symbol)
        let isFiat = false
        //console.log(tempprice.contains('0.'))
        //console.log(typeof tempprice)
        //console.log(typeof tempprice)
        //console.log(isFiat)
        //console.log(rawprice)
        //console.log(name)
        for (let index = 0; index < fiatCurrencies.fiat.length; index++) {
            const element = fiatCurrencies.fiat[index];

            //console.log(fiatCurrencies.fiat.length)
            //console.log(symbol)
            if (name.includes(fiatCurrencies.fiat[index])) {

                isFiat = true
                //console.log("if ", isFiat, symbol, fiatCurrencies.fiat[index], name.includes(fiatCurrencies.fiat[index]))
                break;

                //tempprice = rawprice.toLocaleString('decimal', { minimumFractionDigits: 8 })
            }
        }
        if (!isFiat) {
            tempprice = rawprice.toLocaleString('decimal', { minimumFractionDigits: 8 })
            //console.log("fiat ", symbol)
        }
        isFiat = false
        // if ((tempprice + '').indexOf('e') > -1) {
        //     //console.log('exponent')
        //     tempprice = rawprice.toLocaleString('decimal', { minimumFractionDigits: 8 })
        // } else {

        // }
        //tempprice = rawprice.toLocaleString('decimal', { minimumFractionDigits: 8 })
        //tempprice = tempprice.replace(/(\.\d\d)00$/, '')
        //console.log('b', tempprice)
        return tempprice
    }

    useEffect(() => {
        //console.log (ccxt.exchanges)


        const getPrice = async (tickprice) => {
            let binance = new ccxt.binance({
                apiKey:
                    myKeys.API_KEY,
                secret:
                    myKeys.SECRET_KEY,
            });
            try {
                //tickprice = (await binance.fetchTicker(tickername)).last
                //console.log(await binance.loadMarkets())
                //console.log(await binance.loadMarkets())
                //console.log('a', tickprice)
                //console.log('a', (await binance.fetchBalance()))
                //let finalprice = tickprice.match(/[0]+$/)
                //let finalprice = removeZeroes(tickprice)
                //let finalprice = tickprice.slice(0, -4)
                //console.log()
                // console.log(trade);
                // await trade.auth.login("senyasmolett@gmail.com", "4472Simp103St")
                // //console.log(trade.quotes.get("AAPL"))
                // console.log(trade.auth.tokens())
                //let onedayclose = (await binance.fetchOHLCV(tickername, "1h", Date.now() - 86400000))[0][1]
                let data = await binance.fetchOHLCV(tickername, "1d", Date.now() - 2629746000)
                tickprice = data[29][4]
                setOnedaychange(((tickprice / data[29][1] * 100) - 100).toLocaleString('decimal', { maximumFractionDigits: 2 }))
                setOneweekchange(((tickprice / data[22][1] * 100) - 100).toLocaleString('decimal', { maximumFractionDigits: 2 }))
                setOnemonthchange(((tickprice / data[0][1] * 100) - 100).toLocaleString('decimal', { maximumFractionDigits: 2 }))
                //console.log(tickername, (await binance.fetchOHLCV(tickername, "1d", Date.now() - 2629746000)))
                // let oneweekclose = (await binance.fetchOHLCV(tickername, "1d", Date.now() - 604800000))[0][1]
                //console.log(onedayclose)
                setPrice(tickprice)
                setSymbol(tickername)
                //setOnedaychange(((tickprice / onedayclose * 100) - 100).toLocaleString('decimal', { maximumFractionDigits: 2 }))
                // setOneweekchange(((tickprice / oneweekclose * 100) - 100).toLocaleString('decimal', { maximumFractionDigits: 2 }))
                //setPrice((await binance.fetchTicker(symbol)).last)
                //tickprice = removeZeroes((await binance.fetchTicker(symbol)).last)
            } catch (error) {
                console.log(error)
                setPrice(error.message)
            }
            //console.log(ticker.tickername)
        }
        var timerID = setInterval(() => {
            getPrice()
        }, 2000);

        return function cleanup() {
            //console.log('b')
            clearInterval(timerID);
        };
    }, [price]);


    return (
        <div>
            <h4>
                {removeZeroes(price, symbol)}
            </h4>
            <div className="percentchange">
                {
                    (() => {
                        if (onedaychange.indexOf('-') > -1)
                            return <h5 style={{ color: "#f54242" }}>{onedaychange}%</h5>
                        else if (onedaychange === "0.00")
                            return <h5 style={{ color: "#000000" }}>{onedaychange}%</h5>
                        else
                            return <h5 style={{ color: "#42f551" }}>{onedaychange}%</h5>

                    })()
                }
                <h6>24h</h6>
            </div>
            <div className="percentchange">
                {
                    (() => {
                        if (oneweekchange.indexOf('-') > -1)
                            return <h5 style={{ color: "#f54242" }}>{oneweekchange}%</h5>
                        else if (oneweekchange == "0.00")
                            return <h5 style={{ color: "#000000" }}>{oneweekchange}%</h5>
                        else
                            return <h5 style={{ color: "#42f551" }}>{oneweekchange}%</h5>
                    })()
                }
                <h6>1w</h6>
            </div>
            <div className="percentchange">
                {
                    (() => {
                        if (onemonthchange.indexOf('-') > -1)
                            return <h5 style={{ color: "#f54242" }}>{onemonthchange}%</h5>
                        else if (onemonthchange == "0.00")
                            return <h5 style={{ color: "#000000" }}>{onemonthchange}%</h5>
                        else
                            return <h5 style={{ color: "#42f551" }}>{onemonthchange}%</h5>
                    })()
                }
                <h6>1m</h6>
            </div>

        </div>
    )
}
// ReactDOM.render(
//     <TickerAPIData />,
//     document.getElementById('root')
// );
export default TickerAPIData

