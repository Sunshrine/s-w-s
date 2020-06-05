const Discord = require('discord.js'),
      { get } = require('node-superfetch')
const token = 'Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc'

module.exports = {
        name: "tobecontinued",
        aliases: ['tbc'],
        category: "images",
        description: "Shows A ToBeContinued Image",
        usage: "[mention] || [attachment]",
        run: async (client, message, args) => {
          
          let attachment = message.mentions.users.first() || message.attachments.first() ? message.attachments.first().proxyURL : null || message.author.displayAvatarURL({ dynamic: true })
          if(message.mentions.users.array()[0]) {
            let user = message.mentions.users.array[0]
            attachment = user.displayAvatarURL({ dynamic: true })
          }
          
                  let msg = await message.channel.send('Generating...')
    
    try {
        let { body } = await get('https://emilia-api.glitch.me/api/to-be-continued')
        .query({ image: attachment })
         .set("Authorization", `Bearer ${token}`);
        let s = new Discord.MessageAttachment(body, "tobecontinued.png");
      message.delete()
        msg.delete({ timeout: 5000 });
        message.channel.send(s);
        } catch (e) {
            console.log(e);
            msg.edit(`An error happened! Please try again later!`);
        }
          
    }
}