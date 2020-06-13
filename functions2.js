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
    
    var startAt = Date.now()
    var endAt = Date.now() + time
    
    var duration = endAt - Date.now();
    
    var embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle('🎉 Lottery 🎉')
    .setDescription(`__Time Remaining:__ ${ms(ms(duration), { long: true })}`)
    .setFooter(`To join contribute using ${prefix}lottery <amount>.`)
    .setTimestamp(`Ends At | ${new Date(endAt).toISOString()}`)
    
    let channel = client.channels.cache.get(channelID)
    if(!channel) return
    
    let x = await channel.send(embed)
    
    
    setInterval(() => {
      embed.edit(`__Time Remaining:__ ${ms(ms(duration), { long: true })}`)
    })
  }
}