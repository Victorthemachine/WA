const https = require('https');
const Utils = require('./Utils');
const main = require('./../index');

module.exports = class CryptoManager {
    async checkServerStatus() {
        const url = 'https://api.coingecko.com/api/v3/ping';
        await https.get(url, res => {
            res.on('end', () => {
                try {
                    return true;
                } catch (err) {
                    console.log(err);
                }
            });
        }).on('error', (error) => {
            console.log(error);
            return false;
        })
    }

    fetchRates(resForInit, responseObj) {
        let crypto = responseObj.response.cryptoCurr;
        let curr = responseObj.response.currency;

        switch (crypto) {
            case 'BTC':
                crypto = 'bitcoin';
                break;
            case 'LTC':
                crypto = 'litecoin';
                break;
            case 'XMR':
                crypto = 'monero';
                break;
            default:
                return 'Error occured';
        }
        if (crypto === 'Error occured') return crypto;
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${curr}`;
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
                    switch (crypto) {
                        case 'bitcoin':
                            resRate = json.bitcoin;
                            break;
                        case 'litecoin':
                            resRate = json.litecoin;
                            break;
                        case 'monero':
                            resRate = json.monero;
                            break;
                        default:
                            return 'Error occured';
                    }
                    console.log(resRate);
                    switch (curr) {
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
                    return this.initResponse(resRate, responseObj, resForInit);
                } catch (err) {
                    console.log(err);
                }
            }).on('error', error => {
                console.log(error);
                return 'Error occured';
            })
        })
    }

    initResponse(rate, responseObj, res) {
        if (rate === 'Error occured') return res.send(`Something went wrong, try again later`);
        const conversion = responseObj.response.amount * rate;
        responseObj.response.conversion = conversion;
        console.log(responseObj);
        //const utils = new Utils();
        main.utils.replaceLabelContent(responseObj);
        //        res.send(`Value of ${responseObj.response.cryptoCurr} to ${responseObj.response.currency}: ${conversion}`);
    }
}