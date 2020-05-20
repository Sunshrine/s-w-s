const { MessageEmbed } = require('discord.js'),
      db = require('quick.db')

module.exports = {
  name: 'profile',
  description: 'View your profile and stats',
  category: 'general',
  aliases: ['prof'],
  run: async (client, message, args) => {
    
    let xp = db.fetch(`xp_${message.author.id}`)
    let premiumstatus = db.fetch(`premium_${message.author.id}`)
    let level = db.fetch(`level_${message.author.id}`)
    let acknowledgements = db.fetch(`acknowlegdements_${message.author.id}`)
    
    if(!xp || xp === null || undefined) xp = 0
    if(!premiumstatus || premiumstatus === null || undefined) premiumstatus = 'No premium.'
    if(!level || level === null || undefined) level = 0
    if(!acknowledgements || acknowledgements === null || undefined) acknowledgements = 'User'
    
    const embed = new MessageEmbed()
    .setAuthor('Profile', message.author.displayAvatarURL())
    .setColor("ORANGE")
    .setTitle(`${message.author.username}'s Profile`)
    .addFields(
      { name: 'XP', value: xp, inline: true },
      { name: 'Premium Status', value: premiumstatus, inline: true },
      { name: 'Level', value: level, inline: true },
      { name: 'Acknowledgements', value: acknowledgements, inline: true }
    )
    .setFooter(`• ${client.user.username} Profiles`, client.user.displayAvatarURL())
    
    message.channel.send(embed)
  }
}