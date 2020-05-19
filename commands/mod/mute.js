const { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = {
  name: "mute",
  description: "Mutes a member!",
  usage: "<user> <reason>",
  category: "mod",
  run: async (client, message, args) => {
    // check if the command caller has permission to use the command
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
      return message.channel
        .send("You dont have permission to use this command.")
        .then(m => m.delete({ timeout: 1500 }));

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel
        .send("I don't have permission to add roles!")
        .then(m => m.delete({ timeout: 1500 }));

    //define the reason and mutee
    let mutee =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!mutee)
      return message.channel
        .send("Please supply a user to be muted!")
        .then(m => m.delete({ timeout: 1500 }));

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    //define mute role and if the mute role doesnt exist then create one
    let guild = message.guild;
    let muterole = guild.roles.cache.find(r => r.name === "Muted");
    if (!muterole) {
      try {
        muterole = await guild.roles.create({
          data: { name: "Muted", color: "#514f48", permissions: [] }
        });
        guild.channels.cache.forEach(async (channel, id) => {
          await channel.updateOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

    //add role to the mentioned user and also send the user a dm explaing where and why they were muted
    mutee.roles.add(muterole.id).then(() => {
      message.delete();

      let mutembed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${client.user.username} Moderation`)
        .setTitle("Mute")
        .setDescription(`You have been muted in ${guild.name}.`)
        .addField("Moderator", message.author, true)
        .addField("Reason", reason, true)
        .addField("Muted At", message.createdAt.toLocaleString())
        .setTimestamp();
      mutee.send(mutembed).catch(err => console.log(err));
      message.channel
        .send(`${mutee.user.username} was successfully muted.`)
        .then(m => m.delete({ timeout: 5000 }));
    });
    let channel = db.fetch(`modLogs_${message.guild.id}`);
    if (!channel || channel === null) return;

    //send an embed to the modlogs channel
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("Moderation:", "mute")
      .addField("Mutee:", mutee)
      .addField("Moderator:", message.author)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.cache.get(channel);
    if(!sChannel) return;
    sChannel.send(embed);
  }
};
