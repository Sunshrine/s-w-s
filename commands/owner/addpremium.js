const db = require('quick.db'),
      { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'addpremium',
  description: 'Add premium to a user.',
  category: 'owner',
  aliases: ['addp', 'addpremiumship'],
  usage: '[user]',
  run: async (client, message, args) => {
    
     if(message.author.id != "685371966022352928") return message.channel.send("You're not the bot the owner!").then(m => m.delete({ "timeout": 1500 }))
    
        let user = message.mentions.users.first() || message.author
        
          let userdata = db.fetch(`userData_${user.id}`)
    if(!userdata || userdata === null || userdata === undefined) {
      db.set(`userData_${user.id}`, { indexed: {
        "premium": 'none',
        "acknowledgements": 'none'
      }, global: {
        "username": user.username,
        "avatarlink": user.avatarURL({ dynamic: true }),
        "id": user.id,
        "tag": user.tag
      }})
    }
    
    let premium = db.fetch(`userData_${message.author.id}.indexed.premium`)
    
    if(!premium || premium === null || premium === undefined) premium = 'none'
    
    if(premium = 'none') {
      db.set(`userData_${user.id}.indexed.premium`, 'Unlimited')
      message.channel.send('Added premium to user!')
    } else {
      if(premium !== null || premium !== undefined || premium !== 'none') return message.reply('that user already has premium!')
    }
    
  }
}