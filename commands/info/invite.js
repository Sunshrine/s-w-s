const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ["inv"],
    category: "info",
    description: "Invite this bot to your server!",
    run: async (client, message, args) => {

        message.delete()

        const invitembed = new MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription("Add the bot to your server or join the official server!")
        .setColor("RANDOM")
        .addField("Bot Invitation", "[Invite the bot to your server!](https://discordapp.com/oauth2/authorize?client_id=692374798654898260&scope=bot&permissions=8)")
        .addField("Official Server", "[Join the support server!](https://discord.gg/QbpR3Dj)");
    
    message.channel.send(invitembed)
    }
}