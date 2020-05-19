const db = require("quick.db");

module.exports = {
  name: "setmodlogchannel",
  category: "botsettings",
  aliases: ["setm", "sm", "smc"],
  description: "Sets a channel where the bot sends mod logs!",
  usage: "[channel mention | channel ID | channel name]",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You do not have the required permisson! - [ADMINISTRATOR]**"
      );

    let channel =
      message.mentions.channels.first() ||
      client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
      message.guild.channels.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!channel)
      return message.channel.send(
        "**Please mention a channel, or enter a channel name or ID!**"
      );

    try {
      let a = await db.fetch(`modLogs_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send(
          "**This channel has already been set as the modlogs channel.**"
        );
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Moderation logs channel set!**");
        db.set(`modLogs_${message.guild.id}`, channel.id);

        message.channel.send(
          `**Moderation logs channel has successfully been set in \`${channel.name}\`!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Error - `Missing permissions or channel does not exist!`**",
        `\n${e.message}`
      );
    }
  }
};
