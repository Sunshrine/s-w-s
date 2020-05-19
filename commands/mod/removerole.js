const { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = {
  name: "removerole",
  description: "removes a role to a member of the guild!",
  usage: "<user> <role> <reason>",
  category: "mod",
  aliases: ["ar", "roleremove"],
  run: async (bot, message, args) => {
    message.delete();

    if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel
        .send("You don't have permission to perform this command!")
        .then(m => m.delete({ timeout: 1500 }));

    let rMember =
      message.mentions.members.first() ||
      message.guild.members.cache.find(m => m.user.tag === args[0]) ||
      message.guild.members.cache.get(args[0]);
    if (!rMember)
      return message.channel
        .send("Please provide a user to remove a role too.")
        .then(m => m.delete({ timeout: 1500 }));
    let role =
      message.guild.roles.cache.find(r => r.name == args[1]) ||
      message.guild.roles.cache.find(r => r.id == args[1]) ||
      message.mentions.roles.first();
    if (!role)
      return message.channel
        .send("Please provide a role to remove to said user.")
        .then(m => m.delete({ timeout: 1500 }));
    let reason = args.slice(2).join(" ");
    if (!reason)
      return message.channel
        .send("Please provide a reason")
        .then(m => m.delete({ timeout: 1500 }));

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel.send(
        "I don't have permission to perform this command."
      );

    if (!rMember.roles.cache.has(role.id)) {
      return message.channel.send(`${rMember}, doesnt have the role!`);
    } else {
      await rMember.roles.remove(role.id).catch(e => console.log(e.message));
      message.channel.send(
        `The role, ${role.name}, has been removed from ${rMember}.`
      );
    }

    let channel = db.fetch(`modLogs_${message.guild.id}`);
    if (!channel || channel === null) return;

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("Moderation:", "removerole")
      .addField("Mutee:", rMember)
      .addField("Moderator:", message.author)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  }
};
