const db = require("quick.db"),
  ms = require("parse-ms");
const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
  name: "voterewards",
  description: "Get coins by voting for Centauri!",
  category: "economy",
  aliases: ["votingrewards", "voter", "vrewards"],
  run: async (client, message, args) => {
    function getRandomIntInclusive(min, max) {
      let x = Math.floor(Math.random() * (max - min + 1) + min);
      return x;
    }

    let cooldown = 4.32e7,
      amount = getRandomIntInclusive(260, 1100);

    client.dbl.hasVoted(message.author.id).then(async voted => {
      let lastvote = await db.fetch(`lastVote_${message.author.id}`);

      if (!voted) {
        const novote = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            "<:no:720295035085783103> You did not vote, please vote [here](https://top.gg/bot/692374798654898260/vote)!"
          );

        return message.channel.send(novote);
      }

      if (
        lastvote !== null &&
        cooldown - (Date.now() - lastvote) > 0 &&
        voted
      ) {
        let timeobj = ms(cooldown - (Date.now() - lastvote));

        const votestatus = new MessageEmbed()
          .setColor("RED")
          .setTitle("Reward already collected!")
          .setDescription(
            `${message.member}, please wait *${timeobj.hours}* **hours**, *${timeobj.minutes}* **minutes** and *${timeobj.seconds}* **seconds**!`
          );

        return message.channel.send(votestatus);
      } else {
        if (voted) {
        const success = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("Successfully collected award!")
          .setDescription(
            `Thank you for voting for Centauri! You have gained <:centacoin:718780405481734175> ${amount} as an reward and thank you!`
          );

        db.set(`lastVote_${message.author.id}`, Date.now());
        db.add(`coinBalance_${message.author.id}`, amount);

        message.channel.send(success);

        let webhook = new WebhookClient(
          "720627238659293184",
          "XooM_3qKk3uYsAoMnKhd9DJhfAHlQzwfcmiRDa40El0e2dLs7MA233MQLZ1hbHMDNMV8"
        );
        let collected = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            `${message.author.username} has collected their vote reward of ${amount} coins.`
          );
        
        webhook.send(collected)
      
        }
      } 
    })
    
    
    } 
};
