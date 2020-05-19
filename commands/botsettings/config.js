const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'config',
  description: 'View the guild\'s bot config',
  category: 'botsettings',
  usage: '[setting]',
  run: async (client, message, args) => {
    
    
    
    let X = client.settings.get(message.guild.id)
    if(!X || X === null || undefined) client.settings.set(message.guild.id, {
      toggleStarboard: false,
      toggleWelcome: true,
      toggleAutoMod: false
    })
    
    let settings = [X.toggleStarboard, X.toggleWelcome, X.toggleAutoMod]
    settings.forEach(setting => {
      if(X.setting === false) setting[0] = 'Not toggled on.'
      message.channel.send(`${setting}: ${setting[0]}`)
    })
    
    
    
  }
}