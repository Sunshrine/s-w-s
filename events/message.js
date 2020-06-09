module.exports = async (client, message) => {
  const { MessageEmbed } = require("discord.js");
  const db = require("quick.db");
  const default_prefix = "&";
  const settings = require("../settings.json");

  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.includes(message.mentions.members.first())) {
    let o = message.mentions.members.first()
    let id = o.user.id
    let mentioned = client.afk.get(id);
    if (mentioned) {
      let afkEmbed = new MessageEmbed()
        .setColor("ORANGE")
        .setDescription(
          `**${mentioned.username}** is currently AFK. \n**Reason:** ${mentioned.reason}`
        );
      message.channel.send(afkEmbed);
    }
  }
  let afkcheck = client.afk.get(message.author.id);
  if (afkcheck) {
    let unAFKEmbed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(
        `${message.author.username}, you have been removed from the afk list!`
      );
    client.afk.delete(message.author.id);
    message.reply(unAFKEmbed).then(m => m.delete({ timeout: 5000 }));
  }

  let prefix = db.get(`botPrefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  if (
    client.blacklistedChannels.has(message.channel.id) &&
    message.content !== "&channelblacklist"
  ) {
    message.delete();
    return message.reply("sorry, you cannot use commands here!").then(m =>
      m.delete({
        timeout: 5000
      })
    );
  }
  
  let serverblacklist = db.fetch(`serverBlacklist_${message.guild.id}_${message.author.id}`)
  if(serverblacklist && serverblacklist !== null) {
    message.delete()
    return message.channel.send(`${message.author}, you are blacklisted in this server, meaning you cannot use commands here.`)
  }

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
  

  
};
