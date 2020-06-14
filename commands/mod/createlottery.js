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
    
    await db.set(`lottery_${message.guild.id}`, { users: [], prize: 0 })
    
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("🎉 Lottery 🎉")
    .setDescription(`Prize: ${db.fetch(`lottery_${message.guild.id}.prize`) }`)

  }
};
