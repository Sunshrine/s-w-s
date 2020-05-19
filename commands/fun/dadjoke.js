const { get } = require('node-superfetch')

module.exports = {
  name: 'dadjoke',
  description: 'Get a Dad Joke!',
  category: 'fun',
  run: async (client, message, args) => {
    
    message.delete()
    
    const { body } = await get('https://icanhazdadjoke.com/')
    .set('Accept', 'application/json')
    
    const { MessageEmbed } = require('discord.js')
    
    let X = body.joke
    
    const embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(X)
    
    message.channel.send(`${message.author},`, embed)
    
  }
}