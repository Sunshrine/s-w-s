const db = require("quick.db"),
  { MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["delete", "clear"],
  category: "mod",
  description: "Deletes messages from a channel",
  usage: "<amount of messages>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You don't have sufficient permissions! - [MANAGE_MESSAGES]"
      );
    if (isNaN(args[0]))
      return message.channel.send("**Please supply a number.**");

    if (args[0] > 100)
      return message.channel.send(
        "**Please supply a number that is less than 100.**"
      );

    if (args[0] < 1)
      return message.channel.send(
        "**Please supply a number that is equal to or more than 1.**"
      );

    message.channel.bulkDelete(args[0]).then(messages => {
      message.channel
        .send(
          `**Succesfully deleted \`${messages.size}/${args[0]}\` messages!**`
        )
        .then(msg => msg.delete({ timeout: 2000 }));

      let channel = db.fetch(`modLogs_${message.guild.id}`);
      if (!channel || channel === null) return;

      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .addField("Moderation:", "clear")
        .addField("Deleted Message Size:")
        .addField("Moderator:", message.author)
        .addField("Date:", message.createdAt.toLocaleString());

      let sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
    });
  }
};
