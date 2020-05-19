const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "snipe",
    aliases: ["sn"],
    description: "Snipes a deleted message.",
    category: "general",
    run: async (client, message, args) => {
        const msg = client.snipes.get(message.channel.id) 
        if(!msg) return message.reply("no recently deleted messages!")
      
      const embed = new MessageEmbed()
      .setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL())
      .setDescription(msg.content);
      
      if (msg.image) embed.setImage(msg.image);
      
      message.channel.send(embed);
      
    }
}