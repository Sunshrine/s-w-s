module.exports = {
  name: 'userblacklist',
  description: 'Adds or removes a specific user to the blacklist.',
  category: 'botsettings',
  aliases: ['userb', 'ublacklist'],
  usage: '<user> [reason]',
  run: async (client, message, args) => {
    
    const settings = require('../../settings.json'),
          db = require('quick.db')
    
        if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed or do not have permission to blacklist user!")
    }
    
    var time = new Date()
    
    let user = message.mentions.members.first()
    if(!user) return message.reply('**please mention a user!**')
    if(user.hasPermission("ADMINISTRATOR") && !settings.owners.includes(message.author.id)) message.reply(`**${user} is way too cool to add to the blacklist!**`)
    let reason = args[0]    
    
    if(!reason) reason = 'No reason specified'
    
    if(user.id === message.author.id) message.reply(`**you cannot blacklist yourself!**`)
    
    let blacklistcheck = db.fetch(`serverBlacklist_${message.guild.id}_${user.id}`)
    
        if(blacklistcheck && blacklistcheck !== null) {
    
    db.delete(`serverBlacklist_${message.guild.id}_${user.id}`)
          
    return message.channel.send(`Successfully un-blacklisted ${user}.`)
    
  }
    
    if(!blacklistcheck || !blacklistcheck.length) {
    
    db.set(`serverBlacklist_${message.guild.id}_${user.id}`, {
      operator: message.author + ' || ' + message.author.tag,
      type: "serverwide",
      time: time.toLocaleString({}, { TimeZone: 'Etc/GMT-2' })
    })
    
    return message.channel.send(`Successfully blacklisted ${user}. Please note that this is a server-wide blacklist, not a global one.`)
  } 
    
    
  }
}