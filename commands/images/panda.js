const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "panda",
    category: "images",
    description: "Generate and find panda pictures!",
    run: async (client, message, args) => {

        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/img/panda`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch panda pictures!").then(m => m.delete({ "timeout": 1500 }))

            const pandaembed = new MessageEmbed()
            .setAuthor(`${client.user.username} PANDA PICTURES!`)
            .setColor("RANDOM")
            .setImage(`${body.link}`)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(pandaembed);
            msg.delete();

        })
    }
}