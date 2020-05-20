const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'config',
  description: 'View the guild\'s bot config',
  category: 'botsettings',
  usage: '[setting]',
  run: async (client, message, args) => {
    
    
   if(!args[0]) {
    let X = client.settings.get(message.guild.id)
    if(!X || X === null || undefined) client.settings.set(message.guild.id, {
      toggleStarboard: {
        name: 'toggleStarboard',
        type: false,
        message: ''
      },
      toggleWelcome: {
        name: 'toggleWelcome',
        type: false,
        message: ''
      },
      toggleAutoMod: {
        name: 'toggleAutoMod',
        type: false,
        message: ''
      }
    })
    
    X = client.settings.get(message.guild.id)
    
    let settings = [X.toggleStarboard, X.toggleWelcome, X.toggleAutoMod]
    
    console.log(client.settings)
    
    settings.forEach(function (setting) {
      if(setting.type === false) setting.message = 'Not toggled.'
      if(setting.type === true) setting.message = 'Toggled.'
      message.channel.send(`${setting.name}: ${setting.message}`)
    })
   } else {
     if(args[0].includes(settings)) return message.reply(`that's not a valid setting, here are the settings: ${settings.join('')}`)
     let Y = client.settings.get(message.guild.id)
      if(!Y || Y === null || undefined){  client.settings.set(message.guild.id, {
      toggleStarboard: {
        name: 'toggleStarboard',
        type: false,
        message: ''
      },
      toggleWelcome: {
        name: 'toggleWelcome',
        type: false,
        message: ''
      },
      toggleAutoMod: {
        name: 'toggleAutoMod',
        type: false,
        message: ''
      }
    })
                                       Y = client.settings.get(message.guild.id)}
   }
    
    if(Y.)
    
    
  }
}