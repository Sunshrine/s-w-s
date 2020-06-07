const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'use',
  description: 'Use an item from your inventory!',
  category: 'economy',
  aliases: ['useitem'],
  usage: '[item name]',
  run: async (client, message, args) => {
    
      let inventory = db.fetch(`userData_${message.author.id}.inventory`)
      console.log(inventory)
      if(!inventory || inventory === null || inventory === undefined) inventory = 'No items bought.'
      if(!Array.isArray(inventory) && !inventory.length) inventory = 'No items bought.'
    
    if(!args[0]) {
      const embed1 = new MessageEmbed()
      .setTitle(`Your Inventory || ${message.author.tag}`)
      .setDescription(`Your Items`)
      .addField('Items', inventory)
      .setColor("GREEN")
      
      message.channel.send(embed1)
    } else {
      let inventory = db.get(`userData_${message.author.id}.inventory`)
      if(!inventory.includes(args[0])) return message.reply(`uhmm.. either ${args[0]} is not an item or you don't have it.`)
      
      Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
      
      let x = inventory.remove(args[0])
      db.set(`userData_${message.author.id}.inventory`, x)
      message.channel.send(`Used ${args[0]}`)
    }
  }
}