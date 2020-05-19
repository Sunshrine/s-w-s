const token =
  "Njg1MzcxOTY2MDIyMzUyOTI4.SoTVDCamJwb0GZ1gpipyItkkg2bWtWs8ZHiaWQbP1gc";
const premium = require("../../premiumusers.json");

module.exports = {
  name: "wanted",
  category: "images",
  description: "Make wanted images!",
  usage: "[user]",
  run: async (client, message, args) => {
    message.delete();

    if (!premium.users.includes(message.author.id))
      return message
        .reply("you don't have premium!")
        .then(m => m.delete({ timeout: 1500 }));

    let target =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    if (target === message.guild.members.cache.get(args[0])) {
      let person = message.guild.members.cache.get(args[0]);
      target = person.user;
    }

    const { get } = require("superagent");
    const { MessageAttachment } = require("discord.js");

    const { body } = await get("https://emilia.shrf.xyz/api/wanted")
      .query({ image: target.displayAvatarURL({ format: "png", size: 1024 }) })
      .set("Authorization", `Bearer ${token}`);

    let attachment = new MessageAttachment(body, `${target}-wanted.gif`);

    message.channel.send(`${target}`, attachment);
  }
};
