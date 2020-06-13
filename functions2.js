module.exports = (client) => {
  const { prefix } = require('/events/message.js')
  const ms = require('parse-ms')
  async function createLottery(time, channelID) {
    if(isNaN(time) || time < 0) {
      return null
    }
    
    if(isNaN(channelID) || channelID < 0) {
      return null
    }
    
    const { MessageEmbed } = require('discord.js')
    
    const timeObj = ms(time)
    if(ms.getHours())
    
    const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle('🎉 Lottery 🎉')
    .setDescription(`__Time Remaining:__ `)
    .setFooter(`To join contribute using ${prefix}lottery <amount>.`)
    
    const channel = client.channels.cache.get(channelID)
    if(!channel) return
    
    let x = await channel.send(embed)
    return { id: x.id }
  }
}