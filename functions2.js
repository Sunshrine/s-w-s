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
    
    function convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}
    
    var duration = convertMS(time)
    var time;
    if(duration.seconds === 0) {
      time = `${duration.minutes} minutes`
      if(duration.minutes === 0) {
        time = `${duration}`
      }
    }
    
    
    var embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle('🎉 Lottery 🎉')
    .setDescription(`__Time Remaining:__ `)
    .setFooter(`To join contribute using ${prefix}lottery <amount>.`)
    
    let channel = client.channels.cache.get(channelID)
    if(!channel) return
    
    let x = await channel.send(embed)
    return { id: x.id }
  }
}