const Discord = require('discord.js'),
      fetch = require('node-fetch')
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(process.env.AMETHYSTE_KEY)

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
        let buffer = await AmeAPI.generate("tobecontinued", { url: attachment });
        let s = new Discord.MessageAttachment(buffer, "tobecontinued.png");
      message.delete()
        msg.delete({ timeout: 5000 });
        message.channel.send(s);
        } catch (e) {
            console.log(e);
            msg.edit(`An error happened! Please try again later!`);
        }
          
    }
}