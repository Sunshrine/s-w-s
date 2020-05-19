module.exports = {
        name: "wallpaper",
        aliases: ['images'],
        category: "fun",
        description: "Gets wallpapers!",
        run: async (client, message, args) => {

          
 const { get } = require("node-superfetch");

          const { body } = await get('https://v1.api.amethyste.moe/image/wallpaper')
          .query({ nsfw: 'false' })
          .set("Authorization", `Bearer ${process.env.AMETHYSTE_KEY}`);
          
          const { MessageEmbed } = require('discord.js')
          
          const embed = new MessageEmbed()
          .setTitle('Here\'s your wallpaper!')
          .setImage(body.url)
         
          message.channel.send(embed)
          
    }
}