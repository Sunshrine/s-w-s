const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "pikachugif",
    aliases: ["pikagif"],
    category: "images",
    description: "Generate and find pikachu gifs!",
    run: async (client, message, args) => {

        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/pikachuimg`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch pikachu gifs!");

            const pikachuembed = new MessageEmbed()
            .setAuthor(`${client.user.username} PIKACHU GIFS!`)
            .setColor("RANDOM")
            .setImage(`${body.link}`)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(pikachuembed);
            msg.delete();

        })
    }
}