const db = require('quick.db')
const { MessageEmbed, WebhookClient } = require('discord.js')

module.exports = {
  name: 'voterewards',
  description: 'Get coins by voting for Centauri!',
  category: 'economy',
  aliases: ['votingrewards', 'voter', 'vrewards'],
  run: async (client, message, args) => {
    
    function getRandomIntInclusive(min, max) {
let x = Math.floor(Math.random() * ((max-min)+1) + min);
  return x
}
    
    function generateEmbed(name, color, title, description) {
      const name 
    }
    
        let cooldown = 4.32e+7,
        amount = getRandomIntInclusive(260, 1100)
        
        const { get } = require('node-superfetch')
        
        const { body } = await get(`https://top.gg/api/bots/${client.user.id}/check`)
        .set('Authorization', process.env.DBL_TOKEN)
        .query({ userId: message.author.id })
        
        if(body.vote === 0)
        
  }
}