const client = require("../index");

client.on("ready", () => {
    console.log('Bot Is Ready To Go')
    client.user.setActivity('!help', {
        type: "LISTENING"
    });
});