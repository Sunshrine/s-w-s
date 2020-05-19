const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "randomuselessfact",
    aliases: ["ruf", "rufact", "uselessfact", "randomfact"],
    category: "info",
    description: "Generate and find random useless facts!",
    run: async (client, message, args) => {

        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`https://uselessfacts.jsph.pl/random.json?language=en`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch random useless facts!").then(m => m.delete({ "timeout": 1500 }))

            const randomuselessfactsembed = new MessageEmbed()
            .setAuthor(`${client.user.username} RANDOM USELESS FACTS!`)
            .setColor("RANDOM")
            .setTitle(body.text)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(randomuselessfactsembed);
            msg.delete();

        })
    }
}