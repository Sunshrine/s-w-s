const { MessageEmbed, WebhookClient } = require('discord.js')

module.exports = {
  name: 'jointeam',
  description: 'Join Centauri\'s development team!',
  category: 'info',
  aliases: ['join'],
  run: async (client, message, args) => {
    
    message.channel.createWebhook('Centauri Dev', {
      avatar: 'https://cdn.discordapp.com/attachments/720613045038219365/720998354741493800/512x512bb-dev.jpg'
    }).then(webhook => {
      const join = new MessageEmbed()
      .setColor('GREEN')
      .setDescription('Please wait until CentaDev applications are made!')
      
      webhook.send(join).then(async () => {
        await webhook.delete()
      })
    })
    
  }
}