const bodyParser = require("body-parser");
const CryptoManager = require('./CryptoManager');
const express = require("express");

module.exports = class Utils {

    constructor() {
        const app = express();
        this.initServer(app);
    }

    prepareHTMLDoc(labelContent) {

    }

    replaceLabelContent(content) {
        //`Value of ${responseObj.response.cryptoCurr} to ${responseObj.response.currency}: ${conversion}`
        //document.getElementById("resultsLabel").innerHTML =
        // `<div>Value of ${content.response.cryptoCurr} to ${content.response.currency}: ${content.response.conversion}</div>`;

        this.prepareHTMLDoc(`Value of ${content.response.cryptoCurr} to ${content.response.currency}: ${content.response.conversion}`);
    }

    initServer(app) {
        app.use(express.static(__dirname + './../public'));
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get("/", function(req, res) {
            res.sendFile(__dirname + "/public/index.html");
        });

        app.post("/", function(req, res) {
            const responseObj = { "response": { "amount": Number(req.body.amount), "cryptoCurr": req.body.crypto, "currency": req.body.money } };
            const cryptoMan = new CryptoManager();
            if (cryptoMan.checkServerStatus()) {
                cryptoMan.fetchRates(res, responseObj);
            } else {
                res.send(`Servers are down, try again later`);
            }
        });

        app.listen(8080, function() {
            console.log("Server online, using port 8080");
        });
    }
}