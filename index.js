const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

import { Telegraf } from 'telegraf'

const token = process.env.BOT_TOKEN
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token);

console.log(bot.botInfo.username);

bot.command('help', (ctx) => {
    console.log('enter help');
    ctx.replyWithHTML('you have help');
});

bot.on('g', (ctx) => {
    console.log('g called');
    const data = ctx.getChat.toString();
    ctx.replyWithHTML(`${data}`);
});

bot.on('/g', (ctx) => {
    console.log('/g called');
    const data = ctx.getChat.toString();
    ctx.replyWithHTML(`${data}`);
});

bot.on('help', (ctx) => {
    console.log('help called');
    ctx.replyWithHTML("this is help");
});

bot.on('/help', (ctx) => {
    console.log('/help called');
    ctx.replyWithHTML("this is help");
});

bot.launch();

app.use(cors());
app.use(bodyParser.json());

app.post("/convert", async function (req, res) {
    const requestedText = req.body["text"];
    const langType = req.body["type"];

    let newText = ""

    switch (langType) {
        case "g":
            for (var i = 0; i < requestedText.length; i++) {
                newText += requestedText.charAt(i);
                if (requestedText.charAt(i) == "a" || requestedText.charAt(i) == "i" || requestedText.charAt(i) == "u" || requestedText.charAt(i) == "e" || requestedText.charAt(i) == "o") {
                    newText += "g";
                    newText += requestedText.charAt(i);
                }
            }
            break;

        default:
            res.statusCode = 400;
            res.send({
                "error": "type not supported"
            });
            return;
            break;
    }

    console.log(`http res: ${newText}`);


    res.statusCode = 200;
    res.send({
        "result": newText
    });
});

app.listen("3000", () => {
    console.log('App started');
});