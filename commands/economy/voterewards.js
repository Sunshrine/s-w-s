const db = require('quick.db'),
      ms = require('parse-ms')
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
      name = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      return message.reply(name)
    }
    
        let cooldown = 4.32e+7,
        amount = getRandomIntInclusive(260, 1100)
        
        const { get } = require('node-superfetch')
        
        const { body } = await get(`https://top.gg/api/bots/${client.user.id}/check`)
        .set('Authorization', process.env.DBL_TOKEN)
        .query({ userId: message.author.id })
        
        if(body.vote === 0) {
          const novote = new MessageEmbed() 
          .setColor('RED') 
          .setDescription('<:no:720295035085783103> You did not vote, please vote [here](https://top.gg/bot/692374798654898260/vote)!')
          
          message.reply(novote)
          }
    
        let lastvote = await db.fetch(`lastVote_${message.author.id}`)
    
    if(lastvote !== null && cooldown - (Date.now() - lastvote) > 0 && body.vote === 1) {
      let timeobj = ms(cooldown - (Date.now() - lastvote))
      
      
      const votestatus = new MessageEmbed()
      .setColor('RED')
      .setTitle('Reward already collected!')
      .setDescription(`${message.member}, please wait *${timeobj.hours}* **hours**, *${timeobj.minutes}* **minutes** and *${timeobj.seconds}* **seconds**!`)
      
      message.reply(votestatus)
    } else {
      if(vote !== 1) return;
      
      c
    }
      
    
        
  }
}