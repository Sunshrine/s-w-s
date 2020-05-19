const token = 'Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc'
const premium = require('../../premiumusers.json')

module.exports = {
    name: "comment",
    category: "images",
    description: "Make youtube comment images!",
    usage: "<query>",
    aliases: ["youtube-comment"],
    run: async (client, message, args) => {

        message.delete()

        if(!premium.users.includes(message.author.id)) return message.reply('you don\'t have premium!').then(m => m.delete({ "timeout": 1500 }))

    let target = message.author;
    let comment = args.slice(0).join(" ");
    if(!comment) return message.reply('give me some text!')


    const { get } = require("superagent");
const { MessageAttachment } = require("discord.js");

const { body } = await get("https://emilia.shrf.xyz/api/youtube")
.query({ image: target.displayAvatarURL({ size: 1024, dynamic: true }), username: target.username, text: comment })
.set("Authorization", `Bearer ${token}`);

let attachment = new MessageAttachment(body, `${target}-comment.png`)

message.channel.send(`${target}`, attachment)


    }

}
