const https = require('https');
const main = require('./../index');
var res = undefined;

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
            case 'DGB':
                crypto = 'digibyte';
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
                try {
                    const json = JSON.parse(body);
                    console.log(json);
                    console.log(crypto);
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
                        case 'digibyte':
                            resRate = json.digibyte;
                            break;
                        default:
                            return 'Error occured';
                    }
                    console.log('Parsed :' + resRate);
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
                    console.log(resRate);
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
        responseObj.response.rate = rate;
        const conversion = responseObj.response.amount * rate;
        responseObj.response.conversion = conversion;
        main.utils.replaceLabelContent(responseObj);
    }

    formatDecimals(num, dec) {
        return Number(num).toFixed(dec);
    }

    setRes(resp) {
        res = resp;
    }

    getRes() {
        return res;
    }

}