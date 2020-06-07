const token = 'Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc'
const db = require('quick.db')

module.exports = {
    name: "fiery",
    category: "images",
    description: "Make fiery images!",
    usage: "[user]",
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

    let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    if(target === message.guild.members.cache.get(args[0])) {
        let person = message.guild.members.cache.get(args[0])
        target = person.user
    }

    const { get } = require("superagent");
const { MessageAttachment } = require("discord.js");

const { body } = await get("https://emilia.shrf.xyz/api/fire")
.query({ image: target.displayAvatarURL({ format: "png", size: 1024 }) })
.set("Authorization", `Bearer ${token}`);

let attachment = new MessageAttachment(body, `${target}-fiery.gif`)

message.channel.send(`${target}`, attachment)


    }

}
