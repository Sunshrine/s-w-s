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
   
     if(!message.member.hasPermission(["ADMINISTRATOR" || "MANAGE_CHANNELS"])) return message.channel.send("Sorry, you can't use this command!")
    
    if(!args[0]) message.reply('please enter a time!')
    
      let prefix = db.get(`botPrefix_${message.guild.id}`);
      if (prefix === null) prefix = '&'
    
    let time = ms(args[0])
    
    let endsAt = Date.now() + time
    
    
    
    let users = db.get(`lottery_${message.guild.id}.users`)
    users = users.length
    
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("🎉 Lottery 🎉")
    .setDescription(`Prize: <:centacoin:718780405481734175> 0 - Participating Users: 0`)
    .setFooter(`Ends At | ${endsAt} | To partic`)
    
    let x = await message.channel.send(embed)
    await db.set(`lottery_${message.guild.id}`, { users: [], prize: 0, messageID: x.id, channelID: message.channel.id })
  }
};
