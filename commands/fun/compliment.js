const { get } = require('node-superfetch')

module.exports = {
  name: 'compliment',
  description: 'Get a compliment!',
  category: 'fun',
  aliases: ['comp'],
  run: async (client, message, args) => {
    
    message.delete()
    
    const { body } = await get('https://complimentr.com/api')
    
    const { MessageEmbed } = require('discord.js')
    
    let X = body.compliment
    
    const embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(X.replace(/^./, v => v.toUpperCase()) + ".")
    
    message.channel.send(`${message.author},`, embed)
    
  }
}