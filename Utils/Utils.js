const bodyParser = require("body-parser");
const CryptoManager = require('./CryptoManager');
const cryptoMan = new CryptoManager();
const express = require("express");

module.exports = class Utils {

    constructor() {
        const app = express();
        this.initServer(app);
    }

    initServer(app) {
        app.use(express.static(__dirname + './../public'));
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get("/", function(req, res) {
            res.sendFile(__dirname + "/public/index.html");
        });

        app.post("/", function(req, res) {
            const responseObj = { "response": { "amount": Number(req.body.amount), "cryptoCurr": req.body.crypto, "currency": req.body.money } };
            if (cryptoMan.checkServerStatus()) {
                cryptoMan.setRes(res);
                cryptoMan.fetchRates(res, responseObj);
            } else {
                res.send(`Servers are down, try again later`);
            }
        });

        app.listen(8080, function() {
            console.log("Server online, using port 8080");
        });
    }

    replaceLabelContent(content) {
        const CryptoToCurr = `${content.response.cryptoCurr} to ${content.response.currency}`;
        const CTCRamount = `${content.response.rate}`;
        const CurrToCrypto = `${content.response.currency} to ${content.response.cryptoCurr}`;
        const CRTCamount = `${cryptoMan.formatDecimals(1 / content.response.rate, 5)}`;
        const conversion = `Value of ${content.response.amount} ${content.response.cryptoCurr}: ${cryptoMan.formatDecimals(content.response.conversion, 3)}${content.response.currency}`;
        const htmlString = `<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" type="text/css" href="style.css" />

<head>
    <title>superamazingcryptocurrconvertoruwu</title>
</head>

<body>
    <h1>Conversion</h1>
    <form action="./" method="post">
        <div class="row">
            <div class="col">
                <table id="table">
                    <tr class="tableHeader">
                        <th>Context</th>
                        <th>Rate</th>
                    </tr>
                    <tr>
                        <th>${CryptoToCurr}</th>
                        <th>${CTCRamount}</th>
                    </tr>
                    <tr>
                        <th>${CurrToCrypto}</th>
                        <th>${CRTCamount}</th>
                    </tr>
                </table>
            </div>
            <div class="col">
                <label class="conversionLabel">${conversion}</label>
            </div>
        </div>
        <div class="backButtonDiv">
            <input class= "backButton" type="button" value="Back" onclick="window.history.back()" /> 
        </div>
    </form>
</body>
<script>
function goBack() {
  window.history.back()
}
</script>
</html>`;
        cryptoMan.getRes() !== undefined ? cryptoMan.getRes().send(htmlString) : console.log('Error loading res');
    }
}