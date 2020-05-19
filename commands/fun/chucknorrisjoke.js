const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "chucknorrisjoke",
  aliases: ["cnjoke"],
  category: "fun",
  description: "Generate and find Chuck Norris jokes!",
  run: async (client, message, args) => {
    message.delete();

    let msg = await message.channel.send("Generating...");

    fetch(`https://api.chucknorris.io/jokes/random`)
      .then(res => res.json())
      .then(body => {
        if (!body)
          return message.channel
            .send("Unable to fetch Chuck Norris jokes!")
            .then(m => m.delete({ timeout: 1500 }));

        const chucknorrisjokembed = new MessageEmbed()
          .setAuthor(`${client.user.username} CHUCK NORRIS JOKES!`)
          .setColor("RANDOM")
          .setTitle(body.value)
          .setTimestamp()
          .setFooter(
            client.user.username.toUpperCase(),
            client.user.displayAvatarURL()
          );

        message.channel.send(chucknorrisjokembed);
        msg.delete();
      });
  }
};
