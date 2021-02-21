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

const gConverter = function (requestedText) {
    let newText = "";
    requestedTextSplit = requestedText.split(" ");
    for (let root = 0; root < requestedTextSplit.length; root++) {
        const element = requestedTextSplit[root];
        for (var i = 0; i < element.length; i++) {
            newText += element.charAt(i);
            if (element.charAt(i) == "a" || element.charAt(i) == "i" || element.charAt(i) == "u" || element.charAt(i) == "e" || element.charAt(i) == "o") {
                newText += "g";
                newText += element.charAt(i);
                continue;
            }

            if ((i + 2) <= element.length) {
                if (element.charAt(i + 2) == "a" || element.charAt(i + 2) == "i" || element.charAt(i + 2) == "u" || element.charAt(i + 2) == "e" || element.charAt(i + 2) == "o") {
                    continue;
                }

                const endWord = element.charAt(i) + element.charAt(i + 1);
                switch (endWord) {
                    case 'ng':
                        continue;
                        break;
                    default:
                        break;
                }
            }

            if ((i + 1) <= element.length) {
                if (element.charAt(i + 1) == "a" || element.charAt(i + 1) == "i" || element.charAt(i + 1) == "u" || element.charAt(i + 1) == "e" || element.charAt(i + 1) == "o") {
                    continue;
                }
            }

            if ((i + 3) <= element.length) {
                const endWord = element.charAt(i + 1) + element.charAt(i + 2) + element.charAt(i + 3);
                switch (endWord) {
                    case 'nya':
                        continue;
                        break;
                    case 'man':
                        continue;
                        break;
                    case 'kan':
                        continue;
                        break;
                    case 'nya':
                        continue;
                        break;
                    case 'wan':
                        continue;
                        break;
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