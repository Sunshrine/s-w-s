module.exports = {
        name: "discordhouse",
        aliases: ['dh'],
        category: "images",
        description: "Assigns you into Brilliance, Bravery or Balance!",
        run: async (client, message, args) => {
          
          let houses = ['Brilliance', 'Bravery', 'Balance']

          if((!houses.map(h => h.toLowerCase()).includes(args[0].toLowerCase()))) return message.reply('please input one of the following types: \`Brilliance\`, \`Bravery\` or \`Balance\`!')
          
          const { MessageEmbed, MessageAttachment } = require('discord.js')
          const ameClient = require("amethyste-api")
          const ameApi = new ameClient(process.env.AMETHYSTE_KEY)
console.log(args[0].charAt(0).toUpperCase() + args[0].slice(1))
          
          ameApi.generate('discordhouse', {
            'url': `${message.author.displayAvatarURL()}`,
            'house': args[0].charAt(0).toUpperCase() + args[0].slice(1)
          }).then(image => {
                    const att = new MessageAttachment(image, "discordhouse.png");
          
          const embed = new MessageEmbed()
          .setTitle('Here\'s your image!')
          .attachFile(att)
         
          message.channel.send(embed)
          }).catch(err => {
                    throw err;
          })
          
    }
}