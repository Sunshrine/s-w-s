const { MessageEmbed, WebhookClient } = require("discord.js");
const db = require("quick.db"),
  ms = require("parse-ms"),
  dailystatus = new MessageEmbed();

module.exports = {
  name: "daily",
  description: "Get your daily coins.",
  aliases: ["dailycoins", "dailyreward"],
  category: "economy",
  run: async (client, message, args) => {
    let cooldown = 8.64e7,
      amount = Math.floor(Math.random() * 250 + 1);

    let lastdaily = await db.fetch(`lastDaily_${message.author.id}`);

    if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
      let timeobj = ms(cooldown - (Date.now() - lastdaily));

      dailystatus.setColor("RED");
      dailystatus.setTitle("Reward already collected!");
      dailystatus.setDescription(
        `${message.member}, please wait *${timeobj.hours}* **hours**, *${timeobj.minutes}* **minutes** and *${timeobj.seconds}* **seconds**!`
      );

      message.channel.send(dailystatus);
    } else {
      let coin = client.emojis.cache.get("718780405481734175");
      dailystatus.setColor("GREEN");
      dailystatus.setTitle("Reward collected!");
      dailystatus.setDescription(
        `${message.member}, successfully collected ${coin} ${amount}!`
      );

      db.set(`lastDaily_${message.author.id}`, Date.now());
      db.add(`coinBalance_${message.author.id}`, amount);

      message.channel.send(dailystatus);

      let webhook = new WebhookClient(
        "720627238659293184",
        "XooM_3qKk3uYsAoMnKhd9DJhfAHlQzwfcmiRDa40El0e2dLs7MA233MQLZ1hbHMDNMV8"
      );
      let collected = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `${message.author.username} has collected their daily reward of ${amount} coins.`
        );

      webhook.send(collected);
    }
  }
};
