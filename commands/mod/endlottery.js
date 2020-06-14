const ms = require("ms"),
  { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = {
  name: "endlottery",
  description: "End a coins lottery!",
  category: "mod",
  aliases: ["endl"],
  run: async (client, message, args) => {
   
     if(!message.member.hasPermission(["ADMINISTRATOR" || "MANAGE_CHANNELS"])) return message.channel.send("Sorry, you can't use this command!")
    
    if(!args[0]) message.reply('please input an ID!')
    
    let messageID = db.fetch(`lottery_${message.guild.id}.messageID`)
    if(messageID !== args[0]) return message.reply('there is no lottery with that ID!')
    
        let channelID = db.fetch(`lottery_${message.guild.id}.channelID`)
    if(!channelID) return;
    
    let channel = client.channels.cache.get(channelID)
    if(!channel) return;
    
    channel.messages.fetch(messageID).then(m => {
      
      let users = db.fetch(`lottery_${message.guild.id}.users`)
      if(users.length === 1) var user = users[1]
      var user = users[Math.floor(Math.random() * users.length)]
      
      var select = m.guild.members.fetch(user)
      
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("🎉 Lottery Ended 🎉")
    .setDescription(`Prize: <:centacoin:718780405481734175> ${db.fetch(`lottery_${message.guild.id}.prize`)} - Winner: <@${user}>`)
    .setFooter(`The lottery ended.`)
    
    let prize = db.fetch(`lottery_${message.guild.id}.prize`)
    var prizee = parseInt(prize)
    
    m.edit(embed)
      db.add(`coinBalance_${user}`, prizee)
      m.channel.send(`<@${user}> won!`)
      db.delete(`lottery_${message.guild.id}`)
    })
  }
};
