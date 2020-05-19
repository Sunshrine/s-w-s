const default_prefix = "&",
      db = require('quick.db'),
      { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'prefix',
  description: 'Shows you the server prefix',
  category: 'botsettings',
  run: async (client, message, args) => {
    
      let prefix = db.get(`botPrefix_${message.guild.id}`)
      if(prefix === null) prefix = default_prefix;
    
    let embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(`This server's prefix is \`\`${prefix}\`\`.`)
    
    message.delete()
    message.channel.send(embed)
    
  }
}