
module.exports = {
  name: 'afk',
  description: 'Put a AFK status.',
  category: 'general',
  aliases: ['awayfromkeyboard'],
  usage: '[reason]',
  run: async (client, message, args) => {
    
    let reason = args.join(' ') ? args.join(' ') : 'I am currently afk, I will reply as soon possible.';
    let afklist = client.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason,
          username: message.author.username
        };

        client.afk.set(message.author.id, construct);
      
      const { MessageEmbed } = require('discord.js')
      
      let afk = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(`${message.author.username}, you have been set to afk for reason: **${reason}**`)
        return message.reply(afk)
    }
    
    
  }
}