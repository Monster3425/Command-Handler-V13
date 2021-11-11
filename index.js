const {
    Client,
    Collection
} = require("discord.js");
const client = new Client({
    intents: 32767,
});
module.exports = client;
const config = require("./config.json");
const token = config.token;
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
require("./handler")(client);

process.on("unhandledRejection", (e) => {
    console.log(e)
})
client.login(token);