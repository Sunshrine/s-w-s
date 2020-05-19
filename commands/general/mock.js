const { MessageEmbed } = require('discord.js');
const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

module.exports = {
    name: "mock",
    description: "sPonGebOB mOcK cOmMaND!",
    usage: "<text>",
    category: "general",
    run: async (client, message, args) => {

        if (args.length < 1) return message.channel.send("Please provide some text to mock...").then(m => m.delete({ "timeout": 1500 }))
    
        let mockEmbed = new MessageEmbed()
        .setTitle("sPonGebOB mOcK")
        .setColor("RANDOM")
        .setDescription(args.map(randomizeCase))
        .setThumbnail("https://cdn.discordapp.com/attachments/424889733043191810/425242569325150208/mock.jpg")
    
        message.channel.send(mockEmbed)

        message.delete();
    
    }
}