const client = require("../index");
const ms = require("ms");
const {
  Collection,
  MessageEmbed
} = require("discord.js");
const Timeout = new Collection();
const config = require("../config.json");
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.mentions.users.first()) {
    if (message.mentions.users.first().id === '876020882944966686') return message.channel.send({
      embeds: [new MessageEmbed()
        .setTitle('Everest')
        .setDescription('Hello! My Prefix Is `/` and you can use /help to get info about all my commands. If you forget prefix you can mention me again')
        .setThumbnail(client.user.displayAvatarURL({
          dynamic: true,
        }))
        .setColor('BLURPLE')
        .setFooter('Created By Ruchit3425#4005 and adesy™#2058')
        .setTimestamp()
      ]
    })
  }
  let p;
  let mentionRegex = message.content.match(
    new RegExp(`^<@!?(${client.user.id})>`, "gi")
  );
  if (mentionRegex) {
    p = `${mentionRegex}`;
  } else {
    p = config.prefix;
  }
  if (!message.content.startsWith(p)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));

  if (!command) return;
  if (command) {
    if (!message.member.permissions.has(command.userPerms || []))
      return message.reply({
        content: `You dont have permissions to execute that command.`,
      });
    if (!message.guild.me.permissions.has(command.botPerms || []))
      return message.reply({
        content: `I dont have permissions to execute that command.`,
      });
    if (command.timeout) {
      if (Timeout.has(`${command.name}${message.author.id}`))
        return message.channel.send(
          `You are on a \`${ms(
            Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
            { long: true }
          )}\` cooldown.`
        );
      command.run(client, message, args);
      Timeout.set(
        `${command.name}${message.author.id}`,
        Date.now() + command.timeout
      );
      setTimeout(() => {
        Timeout.delete(`${command.name}${message.author.id}`);
      }, command.timeout);
    }
  }
});