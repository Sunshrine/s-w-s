const { MessageEmbed } = require('discord.js')
const db = require('quick.db'),
      ms = require('parse-ms')

module.exports = {
  name: 'daily',
  description: 'Get your daily coins.',
  aliases: ['dailycoins', 'dailyreward'],
  category: 'economy',
  run: async (client, message, args) => {
    
    let cooldown = 8.64e+7,
        amount = Math.floor((Math.random() * 250) + 1)
    
    let lastdaily = await db.fetch(`lastDaily_${message.author.id}`)
    
    if(lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
      
    }
    
    
  }
}