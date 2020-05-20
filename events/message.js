module.exports = async (client, message) => {
  const { MessageEmbed } = require("discord.js");
  const db = require("quick.db");
  const default_prefix = "&";
  const settings = require("../settings.json");

  client.guilds.cache.forEach(async guild => {
    let T = client.settings.get(guild.id);
    if (!T || T === null || undefined) {
      client.settings.set(guild.id, {
     toggleStarboard: {
        name: 'toggleStarboard',
        type: false,
        message: ''
      },
      toggleWelcome: {
        name: 'toggleWelcome',
        type: false,
        message: ''
      },
      toggleAutoMod: {
        name: 'toggleAutoMod',
        type: false,
        message: ''
      }
      });
      console.log(`Added ${guild.name} with ID ${guild.id} to the settings!`);
    }
  });

  if (message.author.bot) return;
  if (
    client.killed.has(message.author.id) &&
    !settings.owners.includes(message.author.id)
  )
    message.delete();
  if (
    client.killed.has(message.author.id) &&
    settings.owners.includes(message.author.id)
  ) {
    client.killed.delete(message.author.id);
    message
      .reply(
        "**you have been revived automatically because you are a Centauri bot owner.**"
      )
      .then(msg =>
        msg.delete({
          timeout: 5000
        })
      );
  }
  if (!message.guild) return;

  if (message.content.includes(message.mentions.members.first())) {
    let mentioned = client.afk.get(message.mentions.users.first().id);
    if (mentioned) {
      let afkEmbed = new MessageEmbed()
        .setColor("ORANGE")
        .setDescription(
          `**${mentioned.username}** is currently AFK. \n**Reason:** ${mentioned.reason}`
        );
      message.channel.send(afkEmbed);
    }
  }
  let afkcheck = client.afk.get(message.author.id);
  if (afkcheck) {
    let unAFKEmbed = new MessageEmbed()
      .setColor("ORANGE")
      .setDescription(
        `${message.author.username}, you have been removed from the afk list!`
      );
    client.afk.delete(message.author.id);
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

  if (client.blacklistedUsers.has(message.author.id)) {
    message.delete();
    return message.reply("sorry, you cannot use commands!").then(m =>
      m.delete({
        timeout: 5000
      })
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
};
