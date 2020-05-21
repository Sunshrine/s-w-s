const { MessageEmbed } = require('discord.js'),
      fetch = require('node-fetch')
const encode = require('strict-uri-encode')

module.exports = {
  name: 'searchimage',
  description: 'Get a image of delicious food!',
  category: 'images',
  aliases: ['searchimg'],
  run: async (client, message, args) => {
    
    if(!args.slice(0).join(' ')) return message.reply('please input a query!')
    
    const { body } = fetch(`https://api.unsplash.com/photos/random/?client_id=gY5yjtEIgYGefV3T1bf59TY2e7Qwh5CCqmEqkMxb45g&query=${encode(args.slice(0).join(' '))}`)        
        .then(res => res.json())
        .then(body => {
    
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
        })
    
  }
}