const Discord = require("discord.js"),
  { get } = require("node-superfetch");
const token = process.env.AMETHYSTE_KEY;

module.exports = {
  name: "gay",
  category: "images",
  description: "Show your pride!",
  usage: "[mention] || [attachment]",
  run: async (client, message, args) => {
    let attachment =
      message.mentions.users.first() ||
      message.author.displayAvatarURL({ dynamic: true });
    if (message.mentions.users.array()[0]) {
      let user = message.mentions.users.array[0];
      attachment = user.displayAvatarURL({ dynamic: true });
    }

    let msg = await message.channel.send("Generating...");

    try {
      let { body } = await get("https://v1.api.amethyste.moe/generate/gay")
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
