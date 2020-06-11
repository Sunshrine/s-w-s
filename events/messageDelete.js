module.exports = async (client, message) => {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
  
  const image = message.attachments.first() ? message.attachments.first().proxyURL : null
  const { WebhookClient, MessageEmbed } = require('discord.js')
  
    let webhook = new WebhookClient('720627238659293184', 'XooM_3qKk3uYsAoMnKhd9DJhfAHlQzwfcmiRDa40El0e2dLs7MA233MQLZ1hbHMDNMV8')
    const success = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`A message by ${message.author.tag} in ${message.guild.name} was deleted.`)
    .setThumbnail(message.author.dispalyAvatarURL())
    
    if(message.content) success.setDescription(message.content)
    if(image && image !== null) success.setImage(message.attachments.first().proxyURL)
  
  webhook.send(success)
}