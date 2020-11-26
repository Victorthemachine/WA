const express = require("express");
const bodyParser = require("body-parser");
const CryptoManager = require('./Utils/CryptoManager');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const responseObj = { "response": { "amount": Number(req.body.amount), "cryptoCurr": req.body.crypto, "currency": req.body.money } };
    const cryptoMan = new CryptoManager();
    if (cryptoMan.checkServerStatus()) {
        cryptoMan.fetchRates(res, responseObj);
    } else {
        res.send(`Servers are down, try again later`);
    }
});

app.listen(8080, function () {
    console.log("Server online, using port 8080");
});
