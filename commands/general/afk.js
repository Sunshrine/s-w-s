
module.exports = {
  name: 'afk',
  description: 'Put a AFK status.',
  category: 'general',
  aliases: ['awayfromkeyboard'],
  usage: '[reason]',
  run: async (client, message, args) => {
    
    const db = require('quick.db')
    
    let reason = args.join(' ') ? args.join(' ') : 'I am currently afk, I will reply as soon possible.';
    let afklist = db.fetch(`isAfk_${message.author.id}`)

    if (!afklist || !afklist.length) {
      db.set(`isAfk_${message.author.id}`, true)
      db.set(`isAfk_${message.author.id}.reason`, reason)
    }
    
      
      const { MessageEmbed } = require('discord.js')
      
      let afk = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(`${message.author.username}, you have been set to afk for reason: **${reason}**`)
        return message.reply(afk)
    
    
  }
}