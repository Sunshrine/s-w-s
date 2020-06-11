module.exports = async (client, message) => {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
  
  const { WebhookClient, MessageEmbed } = require('discord.js')
  
    let webhook = new WebhookClient('719929466931118110', 'Gu6_T49edPjSoSdB2w6e7g4K7rer_EC6FGvXCGtptZWKY6GYCEnTmIl79Rb1pZP0-iYt')
    const success = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`A message by ${message.author.tag} in ${message.guild.name} was deleted.`)
    
    if(message.content) success.setDescription(message.content)
    if(message.atttachments.first() !== null) success.setImage(message.attachments.first().proxyURL)
  
  webhook.send(success)
}