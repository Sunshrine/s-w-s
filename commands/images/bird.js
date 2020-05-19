const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "bird",
    category: "images",
    description: "Generate and find bird pictures!",
    run: async (client, message, args) => {
        
        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/img/birb`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch bird pictures!").then(m => m.delete({ "timeout": 1500 }))

            const birbembed = new MessageEmbed()
            .setAuthor(`${client.user.username} BIRD PICTURES!`)
            .setColor("RANDOM")
            .setImage(`${body.link}`)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(birbembed);
            msg.delete();

        })
    }
}