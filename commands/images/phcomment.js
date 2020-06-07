const db = require('quick.db')
const fetch = require('node-fetch'),
      Discord = require('discord.js')

module.exports = {
  name: 'phcomment',
  description: 'Makes a PornHub comment image!',
  aliases: ['phubcomment', 'pornhubcomment'],
  usage: '<text>',
  category: 'images',
  run: async (client, message, args) => {
    
let userdata = db.fetch(`userData_${message.author.id}`)
    if(!userdata || userdata === null || userdata === undefined) {
      db.set(`userData_${message.author.id}`, { indexed: {
        "premium": 'none',
        "acknowledgements": 'none'
      }, global: {
        "username": message.author.username,
        "avatarlink": message.author.avatarURL({ dynamic: true }),
        "id": message.author.id,
        "tag": message.author.tag
      }})
    }
    
    let premium = db.fetch(`userData_${message.author.id}.indexed.premium`)
    
    if(!premium || premium === null || premium === undefined || premium === 'none') return message.reply('**you don\'t have premium!**')
    
    let comment = args.slice(0).join(" ")
    if(!comment) return message.reply('**please provide a comment!**')
    
    let authorAv = message.author.displayAvatarURL()
    let authorUser = message.author.username
    
        let msg = await message.channel.send('Generating...')
    
    try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${authorAv}&text=${comment}&username=${authorUser}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
            message.delete({ timeout: 5000 });
            message.channel.send(attachment);
            msg.delete({ timeout: 5000 });
        } catch (e) {
            console.log(e);
            msg.edit(`An error happened! Please try again later!`);
        }
    
  }
}