module.exports = {
  name: 'channelblacklist',
  description: 'Adds or removes a specific channel to the blacklist.',
  category: 'botsettings',
  aliases: ['channelb', 'cblacklist'],
  usage: '[channel] [reason]',
  run: async (client, message, args) => {
    
        if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed or do not have permission to blacklist channels!")
    }
    
    var time = new Date()
    
    let channel = message.channel
    let reason = args[0]
    
    if(message.mentions.channels.array()[0]) {
      channel = message.mentions.channels.array()[0]
      reason = args[1]
    }
    
    if(!reason) reason = 'No reason specified'
    
    if(!client.blacklistedChannels.has(channel.id)) {
      client.blacklistedChannels.set(channel.id, {
      reason: reason,
      operator: message.author.username + '#' + message.author.tag,
      date: time.toLocaleDateString({}, { timeZone: 'Etc/GMT-2' }),
      time: time.toLocaleTimeString({}, { timeZone: 'Etc/GMT-2' })
    })
      return message.channel.send(`Added <#${channel.id}> to the blacklist.`)
    } 
    
    if(client.blacklistedChannels.has(channel.id)) {
      client.blacklistedChannels.delete(channel.id)
      return message.channel.send(`Removed <#${channel.id}> from the blacklist.`)
    }
    
  }
}