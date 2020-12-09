const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    let amount = Number.parseInt(req.body.amount);
    let cryptoCurr = req.body.cryptoCurr;
    let curr = req.body.curr;
    this.res = res;

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurr}&vs_currencies=${curr}`;
    https.get(url, res => {
        let body = '';
        res.on('data', chunk => {
            body += chunk;
        })
        res.on('end', () => {
            try {
                const json = JSON.parse(body);
                let resRate = 'Error occured';
                switch (cryptoCurr) {
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
                this.res.send(`Cryptocurrency ${cryptoCurr} is ${amount * resRate} ${curr}`);
            } catch (err) {
                console.log(err);
            }
        }).on('error', error => {
            console.log(error);
            return 'Error occured';
        })
    })

});

app.listen(8080, function () {
    console.log("Server is listening to port 8080");
});