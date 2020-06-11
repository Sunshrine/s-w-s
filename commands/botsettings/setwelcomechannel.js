const db = require("quick.db");

module.exports = {
  name: "setwelcomechannel",
  category: "botsettings",
  aliases: ["setw", "sw", "swc"],
  description: "Sets a channel where the bot sends welcome messages!",
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
      let a = await db.fetch(`welcomeChannel_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send(
          "**This channel has already been set as the welcome channel.**"
        );
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Welcome channel set!**");
        db.set(`welcomeChannel_${message.guild.id}`, channel.id);

        message.channel.send(
          `**Welcome channel has successfully been set in \`${channel.name}\`!**`
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
