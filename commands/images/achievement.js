const token =
  "Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc";
const db = require('quick.db')

module.exports = {
  name: "achievement",
  category: "images",
  description: "Make achievement images!",
  usage: "<query>",
  aliases: ["achieve"],
  run: async (client, message, args) => {
    message.delete();
    
    let userdata = db.fetch(`userData_${message.author.id}`)
    if(!userdata || userdata === null || userdata === undefined) {
      db.set(`userData_${message.author.id}`, { indexed: {
        "premium": 'none',
        acknowledgements: 'none'
      }, global: {
        "username": message.author.username,
        "avatarlink": message.author.avatarURL({ dynamic: true }),
        "id": message.author.id,
        "tag": message.author.tag
      }})
    }
    
    let premium = db.fetch(`userData_${message.author.id}.premium`)
    
    if(!premium || premium === null || premium === undefined) return message.reply('**you don\'t have premium!**')
    

    

    let target = message.author;
    let comment = args.slice(0).join(" ");
    if (!comment) return message.reply("give me some text!");

    const { get } = require("superagent");
    const { MessageAttachment } = require("discord.js");

    const { body } = await get("https://emilia.shrf.xyz/api/achievement")
      .query({
        image: target.displayAvatarURL({ format: "png", size: 1024 }),
        text: comment
      })
      .set("Authorization", `Bearer ${token}`);

    let attachment = new MessageAttachment(body, `${target}-comment.png`);

    message.channel.send(`${target}`, attachment);
  }
}
