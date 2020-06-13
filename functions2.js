module.exports = (client) => {
  const { prefix } = require('/events/message.js')
  const ms = require('parse-ms')
  const { MessageEmbed } = require('discord.js')
  async function createLottery(time, channelID) {
    if(isNaN(time) || time < 0) {
      return null
    }
    
    if(isNaN(channelID) || channelID < 0) {
      return null
    }
    
    var duration = Date.now() - time
    
    
    var embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle('🎉 Lottery 🎉')
    .setDescription(`__Time Remaining:__ ${ms(ms(time))}`)
    .setFooter(`To join contribute using ${prefix}lottery <amount>.`)
    
    let channel = client.channels.cache.get(channelID)
    if(!channel) return
    
    let x = await channel.send(embed)
    
    setInterval(() => {
      embed.edit(`__Time Remaining:__ ${ms(ms(time), { long: true })}`)
    })
  }
}