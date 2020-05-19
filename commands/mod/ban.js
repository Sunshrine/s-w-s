const { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = {
  name: "ban",
  description: "Ban a member!",
  usage: "<user> <reason>",
  category: "mod",
  run: async (client, message, args) => {
    message.delete();

    // check if the command caller has permission to use the command
    if (
      !message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR") ||
      !message.guild.owner
    )
      return message.channel.send(
        "You dont have permission to use this command."
      );

    let banmember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banmember)
      return message.channel.send("Please supply a user to be banned!");

    let guild = message.guild;

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send("I don't have permission to ban members!");

    message.delete();

    guild.members
      .ban(`${banmember.id}`, { reason: reason })
      .catch(err => console.log(err));

    message.channel
      .send(`${banmember.user.username} was successfully banned.`)
      .then(m => m.delete({ timeout: 5000 }));

    let channel = db.fetch(`modLogs_${message.guild.id}`);
    if (!channel || channel === null) return;

    //send an embed to the modlogs channel
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${guild.name} Modlogs`, guild.iconURL())
      .addField("Moderation:", "ban")
      .addField("Banned Member:", banmember)
      .addField("Moderator:", message.author)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  }
};
