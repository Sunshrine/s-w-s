const db = require('quick.db')
const { MessageEmbed, WebhookClient } = require('discord.js')

module.exports = {
  name: 'voterewards',
  description: 'Get coins by voting for Centauri!',
  category: 'economy',
  aliases: ['votingrewards']
}