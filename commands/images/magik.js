const fetch = require('node-fetch'),
      Discord = require('discord.js')

module.exports = {
  name: 'magik',
  description: 'Makes your profile magikical!',
  category: 'images',
  run: async (client, message, args) => {
    
    let intensity = Math.floor( (Math.random() * 10) + 1 );
    let intenseX = parseInt(intensity)
    let intenseY = `${intenseX}`

    
        let msg = await message.channel.send('Generating...')
    
    try {
            let res = await fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${message.author.displayAvatarURL({ format: 'png' })}&intensity=${intenseX}`);
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "magik.gif");
            message.delete({ timeout: 5000 });
            message.channel.send(attachment);
            msg.delete({ timeout: 5000 });
      
      if(json.status === 400 && json.success === 'false') return message.reply(`**There was an error: \`\`${json.message}\`\`**`)
        } catch (e) {
            console.log(e);
            msg.edit(`An error happened! Please try again later!`);
        }
    
  }
}