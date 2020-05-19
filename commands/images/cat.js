const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "cat",
    category: "images",
    description: "Generate and find cat pictures!",
    run: async (client, message, args) => {

        message.delete()

        let msg = await message.channel.send("Generating...")

        fetch(`http://aws.random.cat/meow`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch cat picture!").then(m => m.delete({ "timeout": 1500 }))

            const catembed = new MessageEmbed()
            .setAuthor(`${client.user.username} CAT PICTURES!`)
            .setColor("RANDOM")
            .setImage(body.file)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(catembed);
            msg.delete();

        })
    }
}