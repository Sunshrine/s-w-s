const hastebin = require("hastebin-gen");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "hastebin",
    category: "general",
    description: "Generate a hastebin I guess",
    usage: "<text>",
    run: async(client, message, args) => {

        message.delete()

    const msg = args.join(" ");

    if(!args[0]) return message.channel.send(`Put a text please.`).then(m => m.delete({ "timeout": 1500 }))

        const haste = await hastebin(msg, { extension: "txt" })
        const embed = new MessageEmbed()
        .setAuthor(`Done`)
        .setDescription(haste)
        message.channel.send(embed);
        
    }
}