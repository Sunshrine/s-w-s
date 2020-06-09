const db = require("quick.db"),
  { MessageEmbed } = require("discord.js");

module.exports = {
  name: "redeem",
  usage: "<code>",
  description: "Use codes to redeem prizes like coins, items, etc.",
  category: "economy",
  run: async (client, message, args) => {
   let check2 = client.usedcodes.has(args[0]);
    
        if (check2 === true)
      return message.reply("sorry, that code is already redeemed.");
    
    let check1 = db.fetch(`code-${args[0]}`);
    if (!check1 || check1 === null || check1 === undefined)
      return message.reply("that is an invalid code.");


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

      client.usedcodes.set(`${args[0]}`, {
        type: "premium",
        redeemtime: new Date().toLocaleTimeString({}, { timeZone: "Etc/GMT-2" })
      });

      db.delete(`code-${args[0]}`);
    }
    if (typecheck === "premium") {
      let premium = db.fetch(`userData_${message.author.id}.indexed.premium`);

      if (!premium || premium === null || premium === undefined)
        premium = "none";
      if (premium !== "none" || premium === "Unlimited")
        return message.reply("you already have premium!");
      if (premium === "none") {
        db.set(`userData_${message.author.id}.indexed.premium`, "Unlimited");

        let premiumembed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("Successfully redeemed code!")
          .setDescription(`You have gained a prize of 🎁 Centapremium!`);

        message.channel.send(premiumembed);

        client.usedcodes.set(`${args[0]}`, {
          type: "premium",
          redeemtime: new Date().toLocaleTimeString(
            {},
            { timeZone: "Etc/GMT-2" }
          )
        });

        db.delete(`code-${args[0]}`);
      }
    }
    if (typecheck === "item") {
      let item = db.fetch(`code-${args[0]}.item`);
      if (!item) item = "KFC";

      let itemembed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Successfully redeemed code!")
        .setDescription(`You have gained a prize of 🎁 ${item}!`);

      message.channel.send(itemembed);

      db.push(`userData_${message.author.id}.inventory`, item);

      client.usedcodes.set(`${args[0]}`, {
        type: "premium",
        redeemtime: new Date().toLocaleTimeString({}, { timeZone: "Etc/GMT-2" })
      });

      db.delete(`code-${args[0]}`);
    }
  }
};
