const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "koala",
    category: "images",
    description: "Generate and find koala pictures!",
    run: async (client, message, args) => {

        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/img/koala`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch koala picture!").then(m => m.delete({ "timeout": 1500 }))

            const koalaembed = new MessageEmbed()
            .setAuthor(`${client.user.username} KOALA PICTURES!`)
            .setColor("RANDOM")
            .setImage(`${body.link}`)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(koalaembed);
            msg.delete();

        })
    }
}