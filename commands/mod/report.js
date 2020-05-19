const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags"),
  db = require("quick.db");

module.exports = {
  name: "report",
  category: "mod",
  description: "Reports a member",
  usage: "<mention, id>",
  run: async (client, message, args) => {
    message.delete();

    let rMember = message.mentions.members.first();

    if (!rMember)
      return message
        .reply("Couldn't find that person?")
        .then(m => m.delete({ timeout: 1500 }));

    if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
      return message.channel
        .send("Can't report that member")
        .then(m => m.delete({ timeout: 1500 }));

    if (!args[1])
      return message.channel
        .send("Please provide a reason for the report")
        .then(m => m.delete({ timeout: 1500 }));

    let channel = db.fetch(`reportsChannel_${message.guild.id}`);
    if (!channel || channel === null) return;

    const embed = new MessageEmbed()
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL())
      .setAuthor("Reported member", rMember.user.displayAvatarURL())
      .setDescription(stripIndents`**- Member:** ${rMember} (${rMember.user.id})
            **- Reported by:** ${message.member}
            **- Reported in:** ${message.channel}
            **- Reason:** ${args.slice(1).join(" ")}`);

    let sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;

    return sChannel.send(embed);
  }
};
