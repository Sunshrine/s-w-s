const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'leaderboard',
  category: 'economy',
  description: 'View the coins leaderboard!',
  aliases: ['lb'],
  run: async (client, message, args) => {


let money = db.all().filter(data => data.ID.startsWith(`coinBalance`)).sort((a, b) => b.data - a.data)
    money.length = 10;
    var finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i])+1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - ${money[i].data} :dollar:\n`;
    }
    const embed = new MessageEmbed()
    .setAuthor(`Leaderboard!`, message.guild.iconURL())
    .setColor("#7289da")
    .setDescription(finalLb.replace('1.', '🥇').replace('2.', '🥈').replace('3.', '🥉'))
    .setFooter(client.user.tag, client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed);
    
  }
}