const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "hug",
    category: "fun",
    description: "Generate a hug gif!",
    run: async (client, message, args) => {

        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/animu/hug`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch hug gif!");

            const hugembed = new MessageEmbed()
            .setAuthor(`${client.user.username} HUG GIFS!`)
            .setColor("RANDOM")
            .setImage(`${body.link}`)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(hugembed);
            msg.delete();

        })
    }
}