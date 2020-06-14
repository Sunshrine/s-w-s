const ms = require("ms"),
  { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = {
  name: "createlottery",
  description: "Create a coins lottery!",
  category: "mod",
  aliases: ["createl"],
  run: async (client, message, args) => {
   
     if(!message.member.hasPermission(["ADMINISTRATOR" || "MANAGE_CHANNELS"])) return message.channel.send("Sorry, you can't use this command!")
    
    if(!args[0]) message.reply('please enter a time!')
    
      let prefix = db.get(`botPrefix_${message.guild.id}`);
      if (prefix === null) prefix = '&'
    
    
    let users = db.get(`lottery_${message.guild.id}.users`)
    users = users.length
    
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("🎉 Lottery 🎉")
    .setDescription(`Prize: <:centacoin:718780405481734175> 0 - Participating Users: 0`)
    .setFooter(`To participate buy a lottery ticket via the buyticket command.`)
    
    let x = await message.channel.send(embed)
    await db.set(`lottery_${message.guild.id}`, { users: [], prize: 0, messageID: x.id, channelID: message.channel.id })
  }
};
