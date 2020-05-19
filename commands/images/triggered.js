const token = 'Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc'
const premium = require('../../premiumusers.json')

module.exports = {
    name: "triggered",
    slowdown: 5,
    category: "images",
    description: "Make triggered images!",
    usage: "[user]",
    run: async (client, message, args) => {

        message.delete()

        if(!premium.users.includes(message.author.id)) return message.reply('you don\'t have premium!').then(m => m.delete({ "timeout": 1500 }))

    let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    if(target === message.guild.members.cache.get(args[0])) {
        let person = message.guild.members.cache.get(args[0])
        target = person.user
    }

    const { get } = require("node-superfetch");
const { MessageAttachment } = require("discord.js");

const { body } = await get("https://emilia.shrf.xyz/api/triggered")
.query({ image: target.displayAvatarURL({ size: 1024, dynamic: true }) })
.set("Authorization", `Bearer ${token}`);

let attachment = new MessageAttachment(body, `${target}-triggered.gif`)

message.channel.send(`${target}`, attachment)


    }

}
