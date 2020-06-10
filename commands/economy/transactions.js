const db = require('quick.db')
const { MessageEmbed, MessageCollector } = require('discord.js')
const { stripIndents } = require("common-tags");

module.exports = {
  name: 'transactions',
  description: 'Do certain transactions.',
  usage: 'to open up the menu',
  aliases: ['actionsmenu', 'transactionsmenu', 'tmenu'],
  category: 'economy',
  run: async (client, message, args) => {
    
    const coinEmoji = client.emojis.cache.get('718780405481734175')
    
    const menu = new MessageEmbed()
    .setTitle('Transactions Menu')
    .setDescription(stripIndents(`
\`A\` \|\| View current balance
\`B\` \|\| Give coins to a user
\`C\` \|\| Give items to a user
\`D\` \|\| Gift a user a random giftcard (coins/items)`))
    .setFooter('Please reply with the letter of the option.')
    let menumsg = await message.channel.send(menu)
    
    let collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 })
    collector.on('collect', m => {
      let content = m.content.toUpperCase()
      switch (content) {
        case 'A':
          let balance = db.fetch(`coinBalance_${message.author.id}`)
          if(!balance || !balance.length) balance = 0
          menu.setTitle('Your Balance')
          menu.setDescription(`Your coin balance is ${coinEmoji} ${balance}.`)
          menu.setFooter('Centauri Transactions Menu')
          menumsg.edit(menu)
          collector.stop('Success.')
          
        case 'B':
          let user = message.mentions.users.first()
          if(!)
      }
    })
  }
}