require('dotenv').config();
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

bot.on("text", (ctx) => {
    if (gConverter(ctx.message.text) !== '') {
        ctx.reply(gConverter(ctx.message.text));
    }
})

bot.on('inline_query', (ctx) => {
    if (ctx.inlineQuery.query !== '') {
        ctx.answerInlineQuery([{
            type: 'article',
            id: '1',
            title: 'Hasil bahasa G',
            input_message_content: {
                message_text: gConverter(ctx.inlineQuery.query)
            }
        }]);
    }
});

bot.launch();

app.use(cors());
app.use(bodyParser.json());

const isVowel = function (character) {
    return character === "a" || character === "i" || character === "u" || character === "e" || character === "o";
}

const gConverter = function (requestedText) {
    let newText = "";
    requestedTextSplit = requestedText.split(" ");
    for (let root = 0; root < requestedTextSplit.length; root++) {
        const element = requestedTextSplit[root];
        for (var i = 0; i < element.length; i++) {
            newText += element.charAt(i);
            if (isVowel(element.charAt(i).toLowerCase())) {
                newText += "g";
                newText += element.charAt(i);
                continue;
            }

            if ((i + 2) <= element.length) {
                if (isVowel(element.charAt(i + 2))) {
                    continue;
                }

                const endWord = element.charAt(i) + element.charAt(i + 1);
                switch (endWord) {
                    case 'ng':
                        continue;
                    default:
                        break;
                }
            }

            if ((i + 1) <= element.length) {
                if (isVowel(element.charAt(i + 1))) {
                    continue;
                }
            }

            if ((i + 3) <= element.length) {
                const endWord = element.charAt(i + 1) + element.charAt(i + 2) + element.charAt(i + 3);
                switch (endWord) {
                    case 'nya':
                        continue;
                    case 'man':
                        continue;
                    case 'kan':
                        continue;
                    case 'wan':
                        continue;
                    default:
                        break;
                }
            }

            if (i !== element.length - 1) {
                newText += "ege";
            }
        }

        if (root === requestedTextSplit.length - 1) {
            return newText;
        }
        newText += " "
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
if (process.env.PORT !== undefined || process.env.PORT !== '') {
    port = process.env.PORT;
}

setInterval(function() {
    http.get("https://bagaul.herokuapp.com/");
}, 300000); // every 5 minutes (300000)

app.listen(port, () => {
    console.log('App started');
});