const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const https = require('https');

function checkServerStatus() {
    const url = 'https://api.coingecko.com/api/v3/ping';
    https.get(url, res => {
        res.on('end', () => {
            try {
                return true;
            } catch (err) {
                console.log(err);
            }
        });
    }).on('error', (error) => {
        return false;
    })
}

function fetchRates(crypto, curr, resForInit, responseObj) {
    let searchCrypto = '';
    console.log('Fetch: ' + crypto + ' ' + curr + ' ' + searchCrypto);
    switch(crypto) {
        case 'BTC':
            searchCrypto = 'bitcoin';
            break;
        case 'LTC':
            searchCrypto = 'litecoin';
            break;
        case 'XMR':
            searchCrypto = 'monero';
            break;
        default:
            return 'Error occured';
    }
    console.log('Fetch: ' + crypto + ' ' + curr + ' ' + searchCrypto);
    if (searchCrypto === 'Error occured') return searchCrypto;
    //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=CZK
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${searchCrypto}&vs_currencies=${curr}`;
    console.log(url);
    https.get(url, res => {
        let body = '';
        res.on('data', chunk => {
            body += chunk;
        })
        res.on('end', () => {
            console.log(body);
            try {
                const json = JSON.parse(body);
                console.log()
                let resRate = 'Error occured';
                switch(crypto) {
                    case 'BTC':
                        resRate = json.bitcoin;
                        break;
                    case 'LTC':
                        resRate = json.litecoin;
                        break;
                    case 'XMR':
                        resRate = json.monero;
                        break;
                    default:
                        return 'Error occured';
                }
                console.log(resRate);
                switch(curr) {
                    case 'CZK':
                        resRate = resRate.czk;
                        break;
                    case 'EUR':
                        resRate = resRate.eur;
                        break;
                    case 'USD':
                        resRate = resRate.usd;
                        break;
                    default:
                        return 'Error occured';
                }
                return initResponse(resRate, responseObj, resForInit);
            } catch(err) {
                console.log(err);
            }
        }).on('error', error => {
            console.log(error);
            return 'Error occured';
        })
    })
}

function initResponse(rate, responseObj, res) {
    console.log('Rate is: ' + rate);
    if (rate === 'Error occured') return res.send(`Something went wrong, try again later`);
    
    const conversion = responseObj.response.amount * rate;
    res.send(`Value of ${responseObj.response.cryptoCurr} to ${responseObj.response.moneyType}: ${conversion}`);
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    const amount = Number(req.body.amount);
    const cryptoCurr = req.body.crypto;
    const moneyType = req.body.money;
    const responseObj = { "response": { "amount": amount, "cryptoCurr": cryptoCurr, "moneyType": moneyType } };
    if (checkServerStatus) {
        console.log(amount + "\n" + cryptoCurr + "\n" + moneyType);
        fetchRates(cryptoCurr, moneyType, res, responseObj);
    } else {
        res.send(`Servers are down, try again later`);
    }
});

app.listen(8080, function () {
    console.log("Server online, using port 8080");
});
