const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nickname",
    aliases: ["nick"],
    category: "general",
    description: "Change your nickname!",
    usage: "<nickname | reset>",
    run: async (client, message, args) => {

        if(!message.guild.me.hasPermission(["CHANGE_NICKNAME", "MANAGE_NICKNAMES"])) return message.channel.send("I don't have permission to add roles!")

        let nickmemberid = message.member.id
        let nickmember = message.member
        let nickname = args.slice(0).join(" ");
        if(!nickname) return message.channel.send(`${message.author}, please provide a nickname!`)

        message.channel.send("Changing nickname...").then(m => {

            message.guild.members.cache.get(nickmemberid).setNickname(`${nickname}`).catch(err => {
                if(err) return message.channel.send(`Unable to change nickname: ${err}`)
            })    
        
        const nickembed = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`${nickmember}, you have successfully changed your nickname to ${nickname}!`);

        if(args[0] === "reset") {

            let original_nick = message.author.username
            message.guild.members.cache.get(nickmemberid).setNickname(`${original_nick}`)
            nickembed.setDescription(`${nickmember}, you have successfully reset your nickname!`);
            setTimeout(() => {
                m.edit(nickembed)  
              }, 2000);
        } else {
            m.edit(nickembed)
        }
      
        })
    }
}