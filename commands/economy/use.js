const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'use',
  description: 'Use an item from your inventory!',
  category: 'economy',
  aliases: ['useitem'],
  usage: '[item name]',
  run: async (client, message, args) => {
    
    if(!args[0]) {
      let inventory = db.fetch(`userData_${message.author.id}.inventory`)
      if(!inventory || inventory === null || inventory === undefined) inventory = 'No items bought.'
      const embed1 = new MessageEmbed()
      .setTitle(`Your Inventory || ${message.author.tag}`)
      .setDescription(`Your Items`)
      .addField('Items', inventory)
      .setColor("GREEN")
      
      message.channel.send(embed1)
    } else {
      let inventory = db.fetch(`userData_${message.author.id}.inventory`)
      if(!inventory.includes(args[0])) return message.reply(`uhmm.. either ${args[0]} is not an item or you don't have it.`)
      inventory.filter(el )
    }
  }
}