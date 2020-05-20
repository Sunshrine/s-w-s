const { MessageEmbed } = require('discord.js'),
      db = require('quick.db')

module.exports = {
  name: 'profile',
  description: 'View your profile and stats',
  category: 'general',
  aliases: ['prof'],
  run: async (client, message, args) => {
    
    let xp = db.fetch(`profile_${message.author.id}.xp`)
    let premiumstatus = db.fetch(`profile_${message.author.id}.premium`)
    let level = db.fetch(`profile_${message.author.id}.level`)
    let acknowledgements = db.fetch(`profile_${message.author.id}.acknowlegdements`)
    
    if(!xp || xp === null || undefined) xp = 0
    if(!premiumstatus || premiumstatus === null || undefined) premiumstatus = 'No premium.'
    if(!level || level === null || undefined) level = 0
    if(!acknowledgements || acknowledgements === null || undefined) acknowledgements = 'User'
    
    const embed = new MessageEmbed()
    .setAuthor(message.author.displayAvatarURL(), 'Profile')
    .setColor("ORANGE")
    .setTitle(`${message.author.username}'s Profile`)
    .addFields(
      { name: 'XP', value: xp, inline: true },
      { name: 'Premium Status', value: premiumstatus, inline: true },
      { name: 'Level', value: level, inline: true },
      { name: 'Acknowledgements', value: acknowledgements, inline: true }
    )
    .setFooter(client.user.displayAvatarURL(), `• ${client.user.username} Profiles`)
    
    message.channel.send(embed)
  }
}