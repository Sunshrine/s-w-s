module.exports = {
  name: 'userblacklist',
  description: 'Adds or removes a specific user to the blacklist.',
  category: 'botsettings',
  aliases: ['userb', 'ublacklist'],
  usage: '<user> [reason]',
  run: async (client, message, args) => {
    
    const settings = require('../../settings.json')
    
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
    
    if(!client.blacklistedUsers.has(user.id)) {
      client.blacklistedUsers.set(user.id, {
      reason: reason,
      operator: message.author.username + '#' + message.author.tag,
      date: time.toLocaleDateString({}, { timeZone: 'Etc/GMT-2' }),
      time: time.toLocaleTimeString({}, { timeZone: 'Etc/GMT-2' })
    })
      return message.channel.send(`Added <@${user.id}> to the blacklist.`)
    }
    
    if(client.blacklistedUsers.has(user.id)) {
      let X = client.blacklistedUsers.get(user.id)
      if(settings.owners.includes(X.operator) && !settings.owners.ha(message.author.id)) return message.reply(`**${user} was blacklisted by a Centauri Bot owner, meaning no one except Centauri Bot owners can remove him.`)
    }
    
    if(client.blacklistedUsers.has(user.id) && user.id === message.author.id) return message.reply('**you cannot remove yourselve.**')
    
    if(client.blacklistedUsers.has(user.id)) {
      client.blacklistedChannels.delete(user.id)
      return message.channel.send(`Removed <@${user.id}> from the blacklist.`)
    }
    
  }
}