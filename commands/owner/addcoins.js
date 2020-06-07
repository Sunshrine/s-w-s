const db = require("quick.db"),
  { MessageEmbed } = require("discord.js"),
  settings = require("../../settings.json");

module.exports = {
  name: "",
  description: "",
  category: "",
  aliases: [""],
  usage: "",
  run: async (client, message, args) => {
    if (!settings.includes(message.author.id))
      return message.reply("you are not the bot owner!");

    let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return message.reply();
    db.add(`coinBalance_${user.id}`, args[1]);
    let bal = await db.fetch(`coinBalance_${user.id}`);
    
    let coin = client.emojis.cache.get('718780405481734175')

    let moneyEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `<:success:719123112964128830> Added {
          args[1]
        } coins!\n\nNew Balance: ${coin} ${bal}`
      );
    message.channel.send(moneyEmbed);
  }
};
