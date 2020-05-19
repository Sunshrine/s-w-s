const db = require("quick.db");

module.exports = {
  name: "setstarboardchannel",
  category: "botsettings",
  aliases: ["setsb", "ss", "ssbc"],
  description: "Sets a channel where the bot sends starred messages!",
  usage: "[channel mention | channel ID | channel name]",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You do not have the required permisson! - [ADMINISTRATOR]**"
      );
    
    let z1;

let z = client.settings.get(message.guild.id)
if(z) z1 = z.toggleStarboard


if(z1 === false) return message.reply('**sorry, Starboard is toggled off!**')

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
      let a = await db.fetch(`starBoard_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send(
          "**This channel has already been set as the starboard channel.**"
        );
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Starboard channel set!**");
        db.set(`starBoard_${message.guild.id}`, channel.id);

        message.channel.send(
          `**Starboard channel has successfully been set in \`${channel.name}\`!**`
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
