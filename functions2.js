module.exports = () => {
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
    .
  }
}