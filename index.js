const env = require('./env');
var morgan = require('morgan');
const https = require("https");
const http = require("http");
const bot = require('./telebot');
const logic = require('./logic');

const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

bot.runBot();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.post("/convert", async function (req, res) {
    const requestedText = req.body["text"];
    const langType = req.body["type"];

    let newText = ""

    switch (langType) {
        case "g":
            newText += logic.gConverter(requestedText);
            break;

        default:
            res.statusCode = 400;
            res.send({
                "error": "type not supported"
            });
            return;
    }

    res.statusCode = 200;
    res.send({
        "result": newText
    });
});

app.get("/ping", async function (req, res) {
    res.statusCode = 200;
    res.send({
        "result": 'pong'
    });
});

let port = 3000;
if (env.PORT !== undefined || env.PORT !== '') {
    port = env.PORT;
}

setInterval(function() {
    if (env.ENV === '' || env.ENV === 'development' || env.ENV === undefined) {
        http.get(`${env.HOST}/ping`, (res) => {
            console.log(`refresh app dev ${res.body}`);
        });
    } else {
        https.get(`${env.HOST}/ping`, (res) => {
            console.log(`refresh app prod ${res.body}`);
        });
    }
}, 300000);

app.listen(port, () => {
    console.log('App started');
});