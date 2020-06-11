module.exports = async (client, message) => {
  const { MessageEmbed } = require("discord.js");
  const db = require("quick.db");
  const default_prefix = "&";
  const settings = require("../settings.json");

  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.includes(message.mentions.users.first())) {
    let mentioned = db.fetch(
      `isAfk_${message.mentions.users.first().id}.status`
    );
    if (mentioned === true) {
      let afkEmbed = new MessageEmbed()
        .setColor("ORANGE")
        .setDescription(
          `**${
            message.mentions.users.first().username
          }** is currently AFK. \n**Reason:** ${db.fetch(
            `isAfk_${message.mentions.users.first().id}.reason`
          )}`
        );
      message.channel.send(afkEmbed);
    }
  }
  let afkcheck = db.fetch(`isAfk_${message.author.id}.status`);
  if (afkcheck === true) {
    let unAFKEmbed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(
        `${message.author.username}, you have been removed from the afk list!`
      );
    db.set(`isAfk_${message.author.id}.status`, false);
    message.reply(unAFKEmbed).then(m => m.delete({ timeout: 5000 }));
  }

  let prefix = db.get(`botPrefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  if (
    client.blacklistedChannels.has(message.channel.id) &&
    message.content !== "&channelblacklist"
  ) {
    message.delete();
    return message.reply("sorry, you cannot use commands here!").then(m =>
      m.delete({
        timeout: 5000
      })
    );
  }

  let serverblacklist = db.fetch(
    `serverBlacklist_${message.guild.id}_${message.author.id}`
  );
  if (serverblacklist && serverblacklist !== null) {
    message.delete();
    return message.channel.send(
      `${message.author}, you are blacklisted in this server, meaning you cannot use commands here.`
    );
  }

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

  if (Math.random() > 0.7) {
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    function getRandomIntInclusive(min, max) {
      let x = Math.floor(Math.random() * (max - min + 1) + min);
      return x;
    }
    
    let amount = getRandomIntInclusive(260, 2600)

    let code = makeid(15);
    db.set(`code-${code}`, {
      redeemed: "unredeemed",
      type: "coins",
      amount: amount
    });
    
    const filter = m => m.content.includes(code) && !m.author.bot
    
    const first = new MessageEmbed()
    .setColor('GREEN')
    .setTitle('Rare event!')
    .setDescription(`First one to type \`\`${prefix}redeem ${code}\`\` wins <:centacoin:718780405481734175> ${amount}!`)
    
    message.channel.send(first).then(() => {
      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    })
  }
};
