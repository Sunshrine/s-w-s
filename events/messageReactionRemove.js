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
        if(messageReaction.count === 0) {
              eMSG.delete()
          client.starboard.delete(msg.id)
            } else if(eMSG.embeds[0].footer.text.startsWith(msg.id) && eMSG.reactions.count > 0) eMSG.edit(`${messageReaction.count} Stars ⭐`);
      }
    }
  }
}