const { MessageEmbed } = require('discord.js'),
      { get } = require('node-superfetch')

module.exports = {
  name: 'foodimage',
  description: 'Get a image of delicious food!',
  category: 'image',
  aliases: ['foody'],
  run: async (client, message, args) => {
    
    const { body } = get('https://api.unsplash.com/photos/random/?client_id=gY5yjtEIgYGefV3T1bf59TY2e7Qwh5CCqmEqkMxb45g&query=foodporn')
    
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setImage(body.urls.regular)
    
    if(body.description !== null) {
embed.setTitle(body.description.charAt(0).toUpperCase() + body.description.slice(1))
    } else {
      if(body.alt_description !== null) {
        embed.setTitle(body.alt_description.charAt(0).toUpperCase() + body.alt_description.slice(1))
      }
    }
    
    message.delete()
    message.channel.send(embed)
    
  }
}