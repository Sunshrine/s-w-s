const fs = require("fs");

module.exports = {
  name: "serverlist",
  description: "Lists all the servers that the bot is connected to.",
  aliases: ["sl"],
  run: async (client, message, args) => {
    
    const settings = require('../../settings.json')
    
    if(!settings.owners.includes(message.author.id)) return message.reply('You are not the bot owner!') 
    message.delete();

    client.guilds.cache.forEach(guild => {
      fs.appendFileSync(
        `./serverList${message.author.id}.txt`,
        ` - ${guild.name}\n`
      );
    });
    message.reply(`done! I am in ${
        client.guilds.cache.array().length
      } servers!`, {
      files: [`serverList${message.author.id}.txt`]
    });
    setTimeout(() => {
      fs.unlinkSync(`./serverList${message.author.id}.txt`);
    }, 1000);
  }
};
