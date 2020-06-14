const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'buyticket',
  description: 'Buy a lottery ticket!',
  category: 'economy',
  aliases: ['lotteryticket'],
  usage: '<amount of coins>',
  run: async (client, message, args) => {
    
    if(!args[0]) return message.reply('please input an amount of coins!')
    if(isNaN(args[0])) return message.reply('sorry! That is not a number.')
    
    let amount = args[0]
    
    let lottery = db.fetch(`lottery_${message.guild.id}`)
    if(!lottery || lottery === null) return message.reply('there is no running lottery currently!')
    
    let bal = db.fetch(`coinBalance_${message.author.id}`)
    if(bal < amount) return message.reply('you don\'t have that much coins!')
    
    await db.add(`lottery_${message.guild.id}`, amount)
    await db.subtract(`coinBalance_${message.author.id}`, amount)
    await db.push(`lottery_${message.guild.id}`, message.author.id)
    await message.channel.send(`${}`)
    
  }
}