const { MessageEmbed } = require("discord.js"),
  db = require("quick.db");

module.exports = async (client, messageReaction, user) => {
  if (messageReaction.emoji.name === "⭐") {
    const channel = db.fetch(`starBoard_${messageReaction.message.guild.id}`);
    if (!channel) return;
    const starboard = messageReaction.message.guild.channels.cache.get(channel);
    if (!starboard) return;

    let msg = messageReaction.message;

    let starred = client.starboard.get(msg.id);

    if (client.starboard.has(msg.id) && starred !== null) {
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const eMSG = msgs.find(
        msg =>
             msg.embeds.length === 1 && msg.embeds[0].footer
      );
      if (eMSG) {
        console.log(eMSG.embeds[0].title)
          if(eMSG.embeds[0].footer.text.startsWith(msg.id)) eMSG.edit(`${messageReaction.count} Stars ⭐`);
      }
    } else {
        client.starboard.set(msg.id, {
          author: msg.author,
          content: msg.content,
          created: new Date(msg.createdTimestamp),
          url: msg.url
        });

        console.log(
          `Added the message "${msg.content}" with ID ${msg.id} to the starboard collection.`
        );

        let s = client.starboard.get(msg.id);
        if (s) {
          const sEmbed = new MessageEmbed()
            .setTitle("Starred Message")
            .addField("Message Author", s.author)
            .addField("Message Content", s.content)
            .addField("Created At", s.date)
            .addField("URL", `[Click here!](${s.url})`)
            .setFooter(`${msg.id} - ${client.user.username.toUpperCase()}`)

          starboard.send("1 Star ⭐", sEmbed);
        }
      }
    }
}
