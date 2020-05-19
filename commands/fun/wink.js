const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wink",
  category: "fun",
  description: "Generate a wink gif!",
  run: async (client, message, args) => {
    message.delete();

    let msg = await message.channel.send("Generating...");

    fetch(`https://some-random-api.ml/animu/wink`)
      .then(res => res.json())
      .then(body => {
        if (!body) return message.channel.send("Unable to fetch wink gif!");

        const winkembed = new MessageEmbed()
          .setAuthor(`${client.user.username} WINK GIFS!`)
          .setColor("RANDOM")
          .setImage(`${body.link}`)
          .setTimestamp()
          .setFooter(
            client.user.username.toUpperCase(),
            client.user.displayAvatarURL()
          );

        message.channel.send(winkembed);
        msg.delete();
      });
  }
};
