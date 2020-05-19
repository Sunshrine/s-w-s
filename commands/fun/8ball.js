const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "8ball",
  category: "fun",
  description: "Ask the Magical 8-ball a question!",
  usage: "<question>",
  run: async (client, message, args) => {
    message.delete();

    let replies = ["Yes", "No", "Maybe", "Maybe Yes", "Maybe No"];

    let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(0).join(" ");
    if (!question)
      return message.channel
        .send(`Please ask a question, ${message.author}!`)
        .then(m => m.delete({ timeout: 1500 }));

    let ballembed = new MessageEmbed()
      .setAuthor(message.author.tag)
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        "This is the preferred answer chosen by our 8-ball machine!"
      )
      .addFields(
        { name: "\u200B", value: "\u200B" },
        { name: "Your Question", value: question, inline: true },
        { name: "Preferred Response", value: replies[result], inline: true }
      );

    message.channel.send(ballembed);
  }
};
