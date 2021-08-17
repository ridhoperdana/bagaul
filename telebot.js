const env = require('./env');
const tele = require('telegraf');
const logic = require('./logic');

const token = env.BOT_TOKEN
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

const bot = new tele.Telegraf(token);
bot.start((ctx) => {
    ctx.replyWithHTML("halo");
});

bot.on("text", (ctx) => {
    if (logic.gConverter(ctx.message.text) !== '') {
        ctx.reply(logic.gConverter(ctx.message.text));
    }
})

bot.on('inline_query', (ctx) => {
    if (ctx.inlineQuery.query !== '') {
        ctx.answerInlineQuery([{
            type: 'article',
            id: '1',
            title: 'Hasil bahasa G',
            input_message_content: {
                message_text: logic.gConverter(ctx.inlineQuery.query)
            }
        }]);
    }
});

const runBot = () => {
    bot.launch();
}

module.exports = {
    runBot,
}