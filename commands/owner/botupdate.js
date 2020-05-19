const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "botupdates",
    description: "Sends bot updates embed!",
    category: "owner",
    aliases: ["bu", "bupdates"],
    run: async (client, message, args) => {

        if(message.deletable) message.delete()

        if(message.author.id != "685371966022352928") return message.channel.send("You're not the bot the owner!").then(m => m.delete({ "timeout": 1500 }))

        let buembed = new MessageEmbed()
        .setColor('#4eff4e')
        .setTitle('🆘 BOT UPDATES 🆕')
        .setAuthor(`Here are the latest bot updates from the bot owner!`)
        .setTimestamp()
        .setDescription("Type the bot updates!")
        .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());
        let buembedmsg = await message.channel.send(buembed)
        let buembedupdatemsg = await message.channel.send('Please type your updates.')

        let filter = m => !m.author.bot;

        message.channel.awaitMessages(filter, { max: 1 })
        .then(collected => {
            console.log(`Collected ${collected.first().content}!`)
           buembed.setDescription(`**\`\`\`javascript\n${collected.first().content}\n\`\`\`**`)
           buembedmsg.edit(buembed);
           collected.first().delete()
           buembedupdatemsg.edit("Successfully created.").then(m => m.delete({ "timeout": 5000 }))
        })

    }
}