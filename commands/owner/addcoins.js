const db = require("quick.db"),
  { MessageEmbed } = require("discord.js"),
  settings = require("../../settings.json");

module.exports = {
  name: "addcoins",
  description: "Add coins to yourself or a user.",
  category: "owner",
  aliases: ["ac"],
  usage: "[user]",
  run: async (client, message, args) => {
    if (!settings.owners.includes(message.author.id))
      return message.reply("you are not the bot owner!");

    let user = message.mentions.members.first() || message.author;
    let x;
    if(message.mentions.members.array()[0]) {
      x = args[1]
    } else x = args[0]

    if (isNaN(x)) return message.reply();
    db.add(`coinBalance_${user.id}`, x);
    let bal = await db.fetch(`coinBalance_${user.id}`);
    
    let coin = client.emojis.cache.get('718780405481734175')

    let moneyEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `<:success:719123112964128830> Added ${
          args[1]
        } coins!\n\nNew Balance: ${coin} ${bal}`
      );
    message.channel.send(moneyEmbed);
  }
};
