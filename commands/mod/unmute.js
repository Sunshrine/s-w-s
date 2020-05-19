const { MessageEmbed } = require("discord.js"),
      db = require('quick.db')

module.exports = {
        name: "unmute",
        description: "Unmutes a member!",
        usage: "<user> <reason>",
        category: "mod",
        run: async (client, message, args) => {

if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You don\'t have permission to use this command.").then(m => m.delete({ "timeout": 1500 }))

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to remove roles!").then(m => m.delete({ "timeout": 1500 }))

let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be unmuted!").then(m => m.delete({ "timeout": 1500 }))

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

let guild = message.guild;
let muterole = guild.roles.cache.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove!").then(m => m.delete({ "timeout": 1500 }))

mutee.roles.remove(muterole.id).then(() => {
    message.delete()

    let unmutembed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Moderation`)
    .setTitle("Unmute")
    .setDescription(`You have been unmuted in ${guild.name}.`)
    .addField("Moderator", message.author, true)
    .addField("Reason", reason, true)
    .addField("Unmuted At", message.createdAt.toLocaleString())
    .setTimestamp();
    mutee.send(unmutembed).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} was successfully unmuted.`).then(m => m.delete({ "timeout": 5000 }))
})
    let channel = db.fetch(`modLogs_${message.guild.id}`);
    if (!channel || channel === null) return;


//send an embed to the modlogs channel
let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
    .addField("Moderation:", "unmute")
    .addField("Mutee:", mutee)
    .addField("Moderator:", message.author)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.cache.get(channel)
    if(!sChannel) return;
          sChannel.send(embed)
    }
}