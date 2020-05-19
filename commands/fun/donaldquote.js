const { get } = require('node-superfetch')

module.exports = {
  name: 'donaldquote',
  description: 'Get a Donald Trump quote!',
  category: 'fun',
  aliases: ['trumpquote'],
  run: async (client, message, args) => {
    
    message.delete()
    
    const { body } = await get('https://api.tronalddump.io/random/quote')
    
    const { MessageEmbed } = require('discord.js')
    
    let X = body.value
    
    const embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(X)
    
    message.channel.send(`${message.author},`, embed)
    
  }
}