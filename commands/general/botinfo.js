const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Shows info about the bot.',
    category: 'general',
    run: async (client, message, args) => {

        message.delete()

        client.fetchApplication().then(app => {

            let owner = app.owner

        let inline = true
        let bicon = client.user.displayAvatarURL();
        let usersize = client.users.cache.size
        let chansize = client.channels.cache.size 
        let servsize = client.guilds.cache.size
        let clientembed = new MessageEmbed()
        .setColor("#00ff00")
        .setThumbnail(bicon)
        .addField("Bot Name", `${client.user.username}`, inline)
        .addField("Bot Owner", owner, inline )
        .addField("Servers", `🛡 ${servsize}`, inline)
        .addField("Channels", `📁 ${chansize}`, inline)
        .addField("Users", `${usersize}`, inline)
        .addField("Bot Library", "Discord.js", inline)
        .addField("Created On", client.user.createdAt)
        .addField("Commands Count", client.commands.size)
        .addField("Documents", "[docs.centauri.ml](https://docs.centuari.ml/)")
        .setFooter(`Information about: ${client.user.username}. Developed by: ShrineSunX`)
        .setTimestamp()
        
        message.channel.send(clientembed);

        })
    }
}