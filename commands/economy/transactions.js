const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const { stripIndents } = require("common-tags");

module.exports = {
  name: 'transactions',
  description: 'Do certain transactions.',
  usage: 'to open up the menu',
  aliases: ['actionsmenu', 'transactionsmenu', 'tmenu'],
  category: 'economy',
  run: async (client, message, args) => {
    
    const menu = new MessageEmbed()
    .setTitle('Transactions Menu')
    .setDescription(stripIndents(`
\`A\` || View current balance
\`B\` || Give coins to a user
\`C\` || Give items to a user
\`D\` || Gift a user a random giftcard (coins/items)`))
    .setFooter('Please reply with the letter of the option.')
    let menumsg = await message.channel.send(menu)
    
    
  }
}