module.exports = async (client, oldMember, newMember) => {
  const { MessageEmbed } = require('discord.js')
      if(oldMember || newMember) {
        if(newMember.guild.id !== "701908899703423065") return;
    const messagechannel = newMember.guild.channels.cache.get('701908900634558517')
    if (!oldMember.roles.cache.has('701908900043292836') && newMember.roles.cache.has('701908900043292836')) {
      
                      let attachment = 'https://cdn.glitch.com/b2b15323-e58a-4732-9d2a-32c99acc49bc%2FWELCOME.gif?v=1588785510101'

        const welcomembed = new MessageEmbed()
        .setAuthor(`Welcome to ${newMember.guild.name}!`)
        .setTitle('User joined.')
        .setDescription(`Welcome ${newMember}! Say something you bot <a:1_triangle:706205474252521544>`)
        .addField('User Account Created At:', newMember.user.createdAt)
        .addField('Joined At', newMember.joinedAt)
        
        const hello = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Welcome ${newMember.user.username}! \nPlease read the <#701908900634558524>. For more info about nitro visit the following channels: \n<#704796122262274119> \n<#704796195066871880> \n**And please create a ticket in <#701908900798267585> if you have any question about nitro. Thank you and enjoy your stay!**`)
        .attachFiles({ attachment: attachment, name: 'welcome.gif' })
                
        let welcome = client.channels.cache.get('701908900433363017')
        
welcome.send(`Welcome ${newMember}!`, hello)
    messagechannel.send(welcomembed)
}
      if (!oldMember.roles.cache.has('707915800790433793') && newMember.roles.cache.has('707915800790433793')) {
        let chat = client.channels.cache.get('701908900798267589')
        
        let winner = new MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(newMember.user.displayAvatarURL())
        .setTitle("WINNER WINNER CHICKEN DINNER")
        .setDescription(`${newMember} got the <@707915800790433793> role! Congrats!`)
        .setFooter("REEEEEEEEEEEEEEEEEEE")
        .setTimestamp()
        
        chat.send(winner)
        
      }}}