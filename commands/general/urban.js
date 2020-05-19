const urban = require("urban");
const request = require("node-superfetch")
const { MessageEmbed } = require("discord.js");

module.exports = { 
        name: "urban",
        aliases: ["urb", "urbandictionary", "ud"],
        category: "general",
        description: "Gets an urban dictionary definition.",
        usage: "<query>",
        run: async (client, message, args) => {

          message.delete()
            
            const lang = require(`../../DATA/languages/en-US.json`);
            const arguables = message.content.split(' ').slice(1);
        
            if (!message.channel.nsfw) return message.channel.send(lang.pornhubgif_nsfw).then(m => m.delete({ "timeout": 1500 }))
            const content = arguables.slice().join(' ');
            await request.get(`http://api.urbandictionary.com/v0/define?term=${content}`)
              .then((r) => {
                const def = r.body.list[0];
        
                const definition = lang.urban_definition.replace('%word', def.word);
                const embed = new MessageEmbed()
                  .setTitle(`📚 Urban ${lang.urban_embed}`)
                  .setThumbnail('https://everythingfat.files.wordpress.com/2013/01/ud-logo.jpg')
                  .setColor('#ABCDEF')
                  .setDescription(`${definition} \n${(def.definition.length > 1500 ? `${def.definition.substring(0, 1500)}...` : def.definition).replace('[', ' ').replace(']', '')}`)
                  .addField(`📃 ${lang.urban_example}`, `${(def.example.length > 1020 ? `${def.example.substring(0, 1020)}...` : def.example).replace('[', ' ').replace(']', '')}`, false)
                  .addField(`👍 ${lang.urban_thumbsup}`, def.thumbs_up, true)
                  .addField(`👎 ${lang.urban_thumbsdown}`, def.thumbs_down, true);
        
                return message.channel.send({ embed });
              }).catch(() => message.channel.send(lang.urban_error).then(m => m.delete({ "timeout": 1500 })));
        }
}