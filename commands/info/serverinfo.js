const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "Pulls the serverinfo of the guild!",
    category: "info",
    aliases: ["si", "serverdesc"],
    run: async (client, message, args) => {

        message.delete()

        let sEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.cache.size}`, true)
        .setFooter(`GalaxyBot | Made by ShrineSunX#0001`, client.user.displayAvatarURL());

    message.channel.send(sEmbed);
    }
}