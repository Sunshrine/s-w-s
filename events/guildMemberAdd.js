const db = require("quick.db"),
  { MessageEmbed } = require("discord.js"),
  { stripIndents } = require("common-tags");

module.exports = async (member) => {
  const guild = member.guild
  let welcomechannel = db.fetch(`welcomeChannel_${guild.id}`);
  if (!welcomechannel || !welcomechannel.length) return;

  const welcome = new MessageEmbed()
    .setColor("GREEN")
    .setThumbnail(member.user.displayAvatarURL())
    .setTitle(`Welcome to ${guild.name}, ${member.user.username}!`)
    .setDescription(
      stripIndents(`Welcome ${member}!
We hope you enjoy your time and stay here!
We are honoured to have you here!`)
    );

  let channel = guild.channels.cache.get(welcomechannel);
  if (!channel || !channel.length) return;

  channel.send(welcome);

  if (guild.id === "692650451979731024")
    member.roles.cache.add("692650817743749191");
}