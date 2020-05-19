const get = require('node-superfetch');

module.exports = {
    name: 'insult',
    description: 'insults the tagged user or the message sender if no one is tagged',
    category: 'fun',
    usage: '<user>',
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);

    message.delete()
    
    const { body } = await get('https://evilinsult.com/generate_insult.php?lang=en&type=json')
    
    const { MessageEmbed } = require('discord.js')
    
    let X = body.insult
    console.log(X)
    
    const embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(X)
    
    message.channel.send(`${message.author},`, embed)
    },
};