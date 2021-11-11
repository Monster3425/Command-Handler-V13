const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: `Check client's ping!`,
  aliases: [""],
  emoji: "🏓",
  timeout: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const msg = new MessageEmbed()
      .setDescription(`Client Latency: ${client.ws.ping}ms`)
      .setColor(`RED`)
      .setTitle("Pinged Successfully 🏓");
    message.channel.send({ embeds: [msg] });
  },
};
