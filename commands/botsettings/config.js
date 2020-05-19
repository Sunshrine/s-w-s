const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'config',
  description: 'View the guild\'s bot config',
  category: 'botsettings',
  usage: '[setting]',
  run: async (client, message, args) => {
    
    let X = client.settings.get(message.guild.id)
    if(!X || X === null || undefined) client.settings.set(message.guild.id, {
      toggleStarboard: {
        type: false,
        message: ''
      },
      toggleWelcome: {
        type: false,
        message: ''
      },
      toggleAutoMod: {
        type: false,
        message: ''
      }
    })
    
    X = await client.settings.get(message.guild.id)
    
    let settings = [X.toggleStarboard, X.toggleWelcome, X.toggleAutoMod]
    
    console.log(client.settings)
    
    settings.forEach(function (setting) {
      if(setting.type === false) setting.message = 'Not toggled.'
      if(setting.type === true) setting.message = 'Toggled.'
      message.channel.send(`${setting}: ${setting.message}`)
    })
    
    
  }
}