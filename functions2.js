module.exports = (client) => {
  const { prefix } = require('/events/message.js')
  function createLottery(time, channelID) {
    if(isNaN(time) || time < 0) {
      return null
    }
    
    if(isNaN(channelID) || channelID < 0) {
      return null
    }
    
    const { MessageEmbed } = require('discord.js')
    
    const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle('🎉 Lottery 🎉')
    .setDescription(`To join contribute using ${prefix}lottery <amount>.`)
    
    const channel = client.channels.cache.get(channelID)
    if(!channel) return
    
    channel.send(embed)
  }
}