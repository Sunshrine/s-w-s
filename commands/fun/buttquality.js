const { MersenneTwister19937, integer } = require("random-js");
const texts = require("../../DATA/butt.json");

module.exports = {
  name: "buttquality",
  description: "Determines a user's butt quality.",
  category: "fun",
  run: async (client, message, args) => {
    message.delete();

    let muser = message.mentions.users.first();
    let random;

    if (!muser) random = MersenneTwister19937.seed(message.author.id);
    if (muser) random = MersenneTwister19937.seed(muser.id);

    const quality = integer(0, texts.length - 1)(random);

    let description;
    if (!muser) description = `Your butt is ${texts[quality].toLowerCase()}.`;
    if (muser)
      description = `${muser}'s butt is ${texts[quality].toLowerCase()}.`;
    if (muser && muser.id === client.user.id)
      return message.channel.send("Me? I think I have the best butt around!");
    return message.channel.send(description);
  }
};
