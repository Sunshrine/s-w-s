const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["botms", "uptime"],
    category: "info",
    description: "Gives bot latency and uptime.",
    run: async (client, message, args) => {

        message.delete()

        message.channel.send("Getting latency information...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let choices = ["Is my latency good? I hope it is!", "I'm too scared to see, ahhh!", "I really hope it isn't bad!"]
            let response = choices[Math.floor(Math.random() * choices.length)]

            
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes and ${sec.padStart(2, '0')} seconds.`
    }

            const pingembed = new MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(response)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Bot Latency', value: `${ping}MS`, inline: true },
                { name: 'Bot Uptime', value: duration(client.uptime), inline: true },
        );
        
        m.edit(pingembed)

        })
    }
}