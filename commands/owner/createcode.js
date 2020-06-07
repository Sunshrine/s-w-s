const { randomKey } = require("../../functions.js"),
      db = require('quick.db')

module.exports = {
  name: "createcode",
  description: "Creates a redeemable prize code",
  category: "owner",
  aliases: ["cc"],
  run: async (client, message, args) => {
    
    if (message.author.id != "685371966022352928")
      return message.channel
        .send("You're not the bot the owner!")
        .then(m => m.delete({ timeout: 1500 }));
  
    let code = randomKey(15)
    
    db.set(`code-${code}`, { redeemed: 'unredeemed', type: 'coins', amount: '1000' })
    
    message.author.send(`Created code ${code}`)
    
  }
};
