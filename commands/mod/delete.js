const { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = {
  name: "delete",
  description: "Delete a single message by ID.",
  category: "mod",
  usage: "<ID> [Reason]",
  run: async (client, message, args) => {
    // Member doesn't have permissions
    if (!message.member.hasPermission(["MANAGE_MESSAGES"])) {
      return message
        .reply("You can't delete messages....")
        .then(m => m.delete({ timeout: 5000 }));
    }

    if (message.deletable) message.delete();

    let id = args[0];
    let reason = args.slice(1).join(" ");
    let guild = message.guild;

    if (!id)
      return message.channel.send(
        "Please give me a message ID to fetch and delete!"
      );
    if (!reason) reason = "No reason specificied";

    message.channel.messages
      .fetch(id)
      .then(m => {
      let delmsgembed;
      if(!m.attachments.first()) {
        delmsgembed = new MessageEmbed()
          .setTitle("Message Deleted")
          .addField("Message ID", m.id)
          .addField("Message Content", m.content)
          .addField("Message Author", m.author)
          .addField("Deleted By", message.author)
          .addField("Reason", reason)
          .setColor("RANDOM")
          .setTimestamp()
          .setFooter(
            client.user.username.toUpperCase(),
            client.user.displayAvatarURL()
          );
      } else {
        let attachment = message.attachments.first() ? message.attachments.first().proxyURL : null
        if(attachment === null) return
        delmsgembed = new MessageEmbed()
        .setTitle("Image Deleted")
        .addField("Message ID", m.id)
        .addField("Message Author", m.author)
        .addField("Deleted By", message.author)
        .addField("Reason", reason)
        .setTimestamp()
        .setColor("RANDOM")
        .setImage(attachment)
        .setFooter(
            client.user.username.toUpperCase(),
            client.user.displayAvatarURL()
          );
        if(m.content) delmsgembed.addField("Message Content", m.content)
      }

        let channel = db.fetch(`modLogs_${message.guild.id}`);
        if (!channel || channel === null) return;

        let sChannel = message.guild.channels.cache.get(channel);
        if (!sChannel) return;
        sChannel.send(delmsgembed);
        m.delete();
        
    })
      .catch(err => {
        console.error(err);
        if (err)
          return message.channel.send(
            "Invalid message ID given, unable to fetch!"
          );
      });
  }
};
