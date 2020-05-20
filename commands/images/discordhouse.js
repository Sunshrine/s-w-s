module.exports = {
        name: "discordhouse",
        aliases: ['dh'],
        category: "images",
        description: "Assigns you into Brilliance, Bravery or Balance!",
        run: async (client, message, args) => {

          if(args[0])
          
          const { MessageEmbed } = require('discord.js')
          
          const embed = new MessageEmbed()
          .setTitle('Here\'s your im!')
          .setImage(body.url)
         
          message.channel.send(embed)
          
    }
}