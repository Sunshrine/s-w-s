const { createLottery } = require('../../functions2.js'),
      ms = require('ms'),
      ms2 = require('parse-ms'),
      db = require('quick.db')

module.exports = {
  name: 'createlottery',
  description: 'Create a coins lottery!',
  category: 'mod',
  aliases: ['createl'],
  usage: '<m/d/w (for example 1m [1 minute], 3d [3 days] and 9w [9 weeks])>',
  run: async (client, message, args) => {
    
    if(!args[0].includes('s' || 'm' || 'd' || 'w')) {
      return message.reply('please insert how long the lottery lasts, for example: 1w (1 week)')
    }
    
    let lasts = ms(args[0])
    
    createLottery(lasts, message.channel.id).then(id => {
      db.set(`lottery_${message.guild.id}`, { prize: 0 })

      setInterval(() => {

      let timeobj = ms2(Date.now() - lasts);
        message.channel.messages.fetch(id).then(m => {
          m.edit
        })
      })
    })
    
  }
}