const settings = require('../../settings.json');
const db = require('quick.db'),
      { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'userconfig',
  description: 'View the config saved for a user.',
  category: 'owner',
  aliases: ['usercon', 'uconfig'],
  usage: '[user]',
  run: async (client, message, args) => {
    
     if(message.author.id != "685371966022352928") return message.channel.send("You're not the bot the owner!").then(m => m.delete({ "timeout": 1500 }))
    let user = message.mentions.users.first() || message.author
    
  let userdata = db.fetch(`userData_${user.id}`)
    if(!userdata || userdata === null || userdata === undefined) {
      db.set(`userData_${user.id}`, { indexed: {
        "premium": 'none',
        "acknowledgements": 'none'
      }, global: {
        "username": user.username,
        "avatarlink": user.avatarURL({ dynamic: true }),
        "id": user.id,
        "tag": user.tag
      }})
    }
    
    let premium = db.fetch(`userData_${user.id}.indexed.premium`)
    
    if(!premium || premium === null || premium === undefined) premium = 'none'
    
    let acknowledgements = db.fetch(`userData_${user.id}.indexed.acknowlegdements`)
    
    if(!acknowledgements || acknowledgements === null || acknowledgements === undefined) acknowledgements = 'none'
    
        let coin = client.emojis.cache.get('718780405481734175')
        
            let bal = await db.fetch(`coinBalance_${user.id}`);
    
    if(!bal || !bal.length) bal = 0
    
        let inventory = db.fetch(`userData_${message.author.id}.inventory`);
    console.log(inventory);
    if (!inventory || !inventory.length) inventory = "No items bought.";
    
    const embed = new MessageEmbed()
    .setTitle('User Config')
    .setDescription(`Here is the config saved for the user ${user}.`)
    .addField('Premiumship', premium)
    .addField('Acknowlegdements', acknowledgements)
    .addField('Coins', `${coin} ${bal}`)
    .addField('Inventory', inventory)
    
    message.channel.send(embed)
    

    
  }
}