require('dotenv').config();

const ENV = process.env.ENV;
const PORT = process.env.PORT;
const BOT_TOKEN = process.env.BOT_TOKEN;
const HOST = process.env.HOST;

module.exports = {
    ENV,
    PORT,
    BOT_TOKEN,
    HOST,
}