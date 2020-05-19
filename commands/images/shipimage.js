const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'shipimage',
  description: 'Creates a ship image between 2 users!',
  category: 'images',
  aliases: ['ship'],
  usage: '<@user1> <@user2>',
  run: async (client, message, args) => {
    
    let user1 = message.mentions.users.array()[0]
    let user2 = message.mentions.users.array()[1]
      if(!user1) return message.reply('**please mention the first user!**')
    if(!user2) return message.reply('**please mention the second user!**')
    
    let msg = await message.channel.send('Generating...')
    
    try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user1.displayAvatarURL()}&user2=${user2.displayAvatarURL()}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "ship.png");
            message.channel.send(attachment);
            msg.delete({ timeout: 5000 });
        } catch (e) {
            console.log(e);
            msg.edit(`An error happened! Please try again later!`);
        }
  }
}