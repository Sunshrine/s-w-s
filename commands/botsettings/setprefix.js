const db = require('quick.db')

module.exports = {
  name: 'setprefix',
  description: 'Change the bot\'s custom prefix.',
  category: 'botsettings',
  usage: '<new prefix>',
  run: async (client, message, args) => {
    
    const default_prefix = '&'
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed or do not have permission to change the prefix!")
    }
    
    if(!args[0]) {
      return message.channel.send("Please define a prefix to set!")
    }
    
    if(args[1]) {
      return message.channel.send("You cannot set the prefix as a double argument!")
    }
    
    if(args[0].length > 3) {
      return message.channel.send("The prefix cannot be more than 3 characters!")
    }
    
    if(args.join(" ") === default_prefix) {
     db.delete(`botPrefix_${message.guild.id}`)
     return await message.channel.send("Reseted Prefix ✅")
    }
    
        db.set(`botPrefix_${message.guild.id}`, args[0])
  await message.channel.send(`Successfully set bot prefix to \`\`${args[0]}\`\`!`)
    
  }
}