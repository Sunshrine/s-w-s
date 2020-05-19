const premium = require('../../premiumusers.json')
const fetch = require('node-fetch'),
      Discord = require('discord.js')

module.exports = {
  name: 'trumptweet',
  description: 'Makes a Donald Trump tweet image!',
  aliases: ['dttweet', 'donaldtrumptweet'],
  usage: '<text>',
  category: 'images',
  run: async (client, message, args) => {
    
    if(!premium.users.includes(message.author.id)) return message.reply('you don\'t have premium!').then(m => m.delete({ "timeout": 1500 }))
    
    let comment = args.slice(0).join(" ")
    if(!comment) return message.reply('**please input text!**')
  
    
        let msg = await message.channel.send('Generating...')
    
    try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${comment}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "trumptweet.png");
            message.delete({ timeout: 5000 });
            message.channel.send(attachment);
            msg.delete({ timeout: 5000 });
        } catch (e) {
            console.log(e);
            msg.edit(`An error happened! Please try again later!`);
        }
    
  }
}