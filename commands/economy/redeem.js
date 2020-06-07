const db = require("quick.db"),
  { MessageEmbed } = require("discord.js");

module.exports = {
  name: "redeem",
  usage: "<code>",
  description: "Use codes to redeem prizes like coins, items, etc.",
  category: "economy",
  run: async (client, message, args) => {
    let check1 = db.fetch(`code-${args[0]}`);
    if (!check1 || check1 === null || undefined)
      return message.reply("that is an invalid code.");

    let check2 = db.fetch(`code-${args[0]}.redeemed`);
    if (check2 === "redeemed" && check2 !== "unredeemed")
      return message.reply("sorry, that code is already redeemed.");

    let typecheck = db.fetch(`code-${args[0]}.type`);
    if (typecheck === "coins") {
      let coincheck = db.fetch(`code-${args[0]}.amount`);
      if (!coincheck || !coincheck.length) coincheck = 250;

      db.add(`coinBalance_${message.author.id}`, coincheck);
      let coinembed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Successfully redeemed code!")
        .setDescription(
          `You have gained a prize of <:centacoin:718780405481734175> ${coincheck}!`
        );

      message.channel.send(coinembed);

      db.set(`code-${args[0]}.redeemed`, "redeemed");
    }
    if (typecheck === "premium") {
      let premium = db.fetch(`userData_${message.author.id}.indexed.premium`);

      if (!premium || premium === null || premium === undefined)
        premium = "none";
      if (premium !== "none" || premium === 'Unlimited') return message.reply("you already have premium!");
      if (premium === 'none') {
        db.set(`userData_${message.author.id}.indexed.premium`, 'Unlimited')
        
      let premiumembed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Successfully redeemed code!")
        .setDescription(
          `You have gained a prize of 🎁 Centapremium!`
        );

      message.channel.send(premiumembed);
      }
    }
  }
};
