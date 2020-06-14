const ms = require("ms"),
  { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = {
  name: "createlottery",
  description: "Create a coins lottery!",
  category: "mod",
  aliases: ["createl"],
  usage: "<m/d/w (for example 1m [1 minute], 3d [3 days] and 9w [9 weeks])>",
  run: async (client, message, args) => {
    async function createLottery(time, channelID) {
      if (isNaN(time) || time < 0) {
        return null;
      }

      if (isNaN(channelID) || channelID < 0) {
        return null;
      }

      let channel = client.channels.cache.get(channelID);
      if (!channel) return;

      var startAt = Date.now();
      var endAt = Date.now() + time;

      var duration = endAt - Date.now();

      var embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("🎉 Lottery 🎉")
        .setDescription(
          `__Time Remaining:__ ${ms(duration, { long: true })}`
        )
        .setFooter(`To join contribute using the lottery command.`)
        .setTimestamp(`Ends At | ${new Date(endAt).toISOString()}`);
      
      db.set(`lottery_${channelID}`, { prize: 0 });

      let x = await channel.send(embed);

      var s = setInterval(() => {
        var duration = endAt - Date.now();
        embed.setDescription(
          `__Time Remaining:__ ${ms(duration, { long: true })}`
        );
        x.edit(embed);
        
        if(duration === 0) {
          let users = db.fetch(`lottery_${channelID}.users`)
          if(!users || users === null) {
            embed.setDescription('No one won!')
            x.edit(embed)
            return clearInterval(s)
          }
        }
      }, 5000);
    
      
      
    }

    if (!args[0]) return message.reply("please enter a time!");

    let lasts = ms(args[0]);

    createLottery(lasts, message.channel.id)

  }
};
