const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'pay',
  description: 'Pay a user coins!',
  category: 'economy',
  aliases: ['givecoins'],
  usage: '<user> <amount>',
  run: async (client, message, args) => {  

let user = message.mentions.members.first() 

  let member = db.fetch(`coinBalance_${message.author.id}`)

  let embed1 = new MessageEmbed()
  .setColor("RED")
  .setDescription(`<:no:720295035085783103> Mention someone to pay!`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new MessageEmbed()
  .setColor("RED")
  .setDescription(`<<:no:720295035085783103> Specify an amount to pay!`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
  }
  let embed3 = new MessageEmbed()
  .setColor("RED")
  .setDescription(`<:no:720295035085783103> You can't pay someone negative money!`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new MessageEmbed()
  .setColor("RED")
  .setDescription(`<:no:720295035085783103> You don't have that much money!`);

  if (member < args[1]) {
      return message.channel.send(embed4)
  }

  let embed5 = new MessageEmbed()
  .setColor("GREEN")
  .setDescription(`<:yes:720295144296939651> You have payed ${user.user.username} <:centacoin:718780405481734175> ${args[1]}!`);

  message.channel.send(embed5)
  db.add(`coinBalance_${user.id}`, args[1])
  db.subtract(`coinBalance_${message.author.id}`, args[1])
    }
}