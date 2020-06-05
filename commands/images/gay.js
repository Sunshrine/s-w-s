const Discord = require("discord.js"),
  { post } = require("node-superfetch");
const token = process.env.AMETHYSTE_KEY;

module.exports = {
  name: "gay",
  category: "images",
  description: "Show your pride!",
  usage: "[mention] || [attachment]",
  run: async (client, message, args) => {
    let attachment =
      message.mentions.users.first() ||
      message.author.displayAvatarURL();
    if (message.mentions.users.array()[0]) {
      let user = message.mentions.users.array[0];
      attachment = user.displayAvatarURL();
    }

    let msg = await message.channel.send("Generating...");

    try {
      let { body } = await post("https://v1.api.amethyste.moe/generate/gay")
        .query({ url: attachment })
        .set("Authorization", `Bearer ${token}`);
      let s = new Discord.MessageAttachment(body, "tobecontinued.png");
      message.delete();
      msg.delete({ timeout: 5000 });
      message.channel.send(s);
    } catch (e) {
      console.log(e);
      msg.edit(`An error happened! Please try again later!`);
    }
  }
};
