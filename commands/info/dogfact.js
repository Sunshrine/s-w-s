const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "dogfact",
    category: "fun",
    description: "Generate and find dog facts!",
    run: async (client, message, args) => {

        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/facts/dog`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch dog facts!").then(m => m.delete({ "timeout": 1500 }))

            const dogfactembed = new MessageEmbed()
            .setAuthor(`${client.user.username} DOG FACTS!`)
            .setColor("RANDOM")
            .setTitle(body.fact)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(dogfactembed);
            msg.delete();

        })
    }
}