const fs = require("fs");

module.exports = {
  name: "serverlist",
  description: "Lists all the servers that the bot is connected to.",
  aliases: ["sl"],
  run: async (client, message, args) => {
    message.delete();

    let m = await message.reply(
      `I am in ${
        client.guilds.cache.array().length
      } servers! I'll put a list of them in a text file for you. Wait a sec :)`
    );
    client.guilds.cache.forEach(guild => {
      fs.appendFileSync(
        `./serverList${message.author.id}.txt`,
        ` - ${guild.name}\n`
      );
    });
    m.delete();
    message.reply("Done! Here it is.", {
      files: [`serverList${message.author.id}.txt`]
    });
    setTimeout(() => {
      fs.unlinkSync(`./serverList${message.author.id}.txt`);
    }, 1000);
  }
};
