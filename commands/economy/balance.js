const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'balance',
  description: 'Check your coins balance.',
  aliases: ['bal', 'coinbal'],
  category: 'economy',
  run: async (client, message, args) => {
    
    const coinEmoji = client.emojis.cache.get('718780405481734175')
    let coinBalance = db.fetch(`coinBalance_${message.author.id}`)
    const coinEmbed = new MessageEmbed()
    
    if(!coinBalance || coinBalance === null || coinBalance === undefined) coinBalance = 0
    coinEmbed.setTitle(`Coin Balance`)
    coinEmbed.setDescription(`Your balance ${message.member} is ${coinEmoji} ${coinBalance}.`)
    
    message.channel.send(coinEmbed)
    
    
  }
}