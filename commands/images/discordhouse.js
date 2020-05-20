module.exports = {
        name: "discordhouse",
        aliases: ['dh'],
        category: "images",
        description: "Assigns you into Brilliance, Bravery or Balance!",
        run: async (client, message, args) => {
          
          let houses = ['Brilliance', 'Bravery', 'Balance']

          if((!houses.map(h => h.toLowerCase()).includes(args[0].toLowerCase()))) return message.reply('please input one of the following types: \`Brilliance\`, \`Bravery\` or \`Balance\`!')
          
          const { MessageEmbed, MessageAttachment } = require('discord.js')
              const { get } = require("node-superfetch");
          
          const { body } = get(`https://v1.api.amethyste.moe/generate/discordhouse`)
          .query({ house: args[0].charAt(0).toUpperCase() + args[0].slice(1), url: message.author.displayAvatarURL({ format: 'png', size: 512 }) })
          .set("Authorization", `Bearer ${process.env.AMETHYSTE_KEY}`);
          
          let att = new MessageAttachment(body, 'discordhouse.png')
          

          const embed = new MessageEmbed()
          .setTitle('Here\'s your image!')
          .attachFiles(att)
         
          message.channel.send(embed)
  
          
    }
}