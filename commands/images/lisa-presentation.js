const token = 'Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc'
const premium = require('../../premiumusers.json')

module.exports = {
    name: "lisa-presentation",
    category: "images",
    description: "Make youtube lisa presentation images!",
    usage: "<query>",
    aliases: ["lisa-present"],
    run: async (client, message, args) => {

        message.delete()

        if(!premium.users.includes(message.author.id)) return message.reply('you don\'t have premium!').then(m => m.delete({ "timeout": 1500 }))

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
