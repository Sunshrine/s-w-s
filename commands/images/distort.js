const Discord = require("discord.js")

module.exports = {
  name: "distort",
  category: "images",
  description: "Distort avatars!",
  usage: "[mention]",
  run: async (client, message, args) => {
    let attachment =
      message.mentions.users.first() || message.author.displayAvatarURL({ format: 'png' });
    if (message.mentions.users.array()[0]) {
            let user = message.mentions.users.array()[0]
      attachment = user.displayAvatarURL({ format: 'png' });
    }

    let msg = await message.channel.send("Generating...");

    try {
      const ameClient = require("amethyste-api");
      const ameApi = new ameClient(process.env.AMETHYSTE_KEY);
      ameApi
        .generate("distort", {
          url: attachment
        })
        .then(image => {
          let s = new Discord.MessageAttachment(image, "tobecontinued.png");
          message.delete();
          msg.delete({ timeout: 5000 });
          message.channel.send(s);
        })
        .catch(err => {
          throw err;
        });
    } catch (e) {
      console.log(e);
      msg.edit(`An error happened! Please try again later!`);
    }
  }
};
