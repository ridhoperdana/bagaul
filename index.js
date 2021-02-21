const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');

const tele = require('telegraf');

const token = process.env.BOT_TOKEN
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

const bot = new tele.Telegraf(token);
bot.start((ctx) => {
    ctx.replyWithHTML("halo");
});

bot.on('inline_query', (ctx) => {
    ctx.answerInlineQuery([{
        type: 'article',
        id: '1',
        title: 'Hasil bahasa G',
        input_message_content: {
            message_text: gConverter(ctx.inlineQuery.query)
        }
    }]);
});

bot.launch();

app.use(cors());
app.use(bodyParser.json());

const gConverter = function (requestedText) {
    let newText = "";
    for (var i = 0; i < requestedText.length; i++) {
        newText += requestedText.charAt(i);
        if (requestedText.charAt(i) == "a" || requestedText.charAt(i) == "i" || requestedText.charAt(i) == "u" || requestedText.charAt(i) == "e" || requestedText.charAt(i) == "o") {
            newText += "g";
            newText += requestedText.charAt(i);
            continue;
        }
        newText += "e";
        newText += requestedText.charAt(i);
    }
    return newText;
}

app.post("/convert", async function (req, res) {
    const requestedText = req.body["text"];
    const langType = req.body["type"];

    let newText = ""

    switch (langType) {
        case "g":
            newText += gConverter(requestedText);
            break;

        default:
            res.statusCode = 400;
            res.send({
                "error": "type not supported"
            });
            return;
            break;
    }

    res.statusCode = 200;
    res.send({
        "result": newText
    });
});

let port = "3000";
if (process.env.PORT !== undefined || process.env.PORT !== '') {
    port = process.env.PORT;
}

app.listen(port, () => {
    console.log('App started');
});