const token = 'Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc'
const db = require('quick.db')

module.exports = {
    name: "lisa-presentation",
    category: "images",
    description: "Make youtube lisa presentation images!",
    usage: "<query>",
    aliases: ["lisa-present"],
    run: async (client, message, args) => {

        message.delete()

let userdata = db.fetch(`userData_${message.author.id}`)
    if(!userdata || userdata === null || userdata === undefined) {
      db.set(`userData_${message.author.id}`, { indexed: {
        "premium": 'none',
        "acknowledgements": 'none'
      }, global: {
        "username": message.author.username,
        "avatarlink": message.author.avatarURL({ dynamic: true }),
        "id": message.author.id,
        "tag": message.author.tag
      }})
    }
    
    let premium = db.fetch(`userData_${message.author.id}.indexed.premium`)
    
    if(!premium || premium === null || premium === undefined || premium === 'none') return message.reply('**you don\'t have premium!**')
    

    let target = message.author;
    let presentext = args.slice(0).join(" ");
    if(!presentext) return message.reply('give me some text!')


    const { get } = require("node-superfetch");
const { MessageAttachment } = require("discord.js");

const { body } = await get("https://emilia.shrf.xyz/api/lisa-presentation")
.query({ text: `${presentext}` })
.set("Authorization", `Bearer ${token}`);

let attachment = new MessageAttachment(body, `${target}-lisa-presentation.png`)

message.channel.send(`${target}`, attachment)


    }

}
