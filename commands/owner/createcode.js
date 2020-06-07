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
    
    function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
  
    let code = makeid(15)
    
    db.set(`code-${code}`, { redeemed: 'unredeemed', type: 'coins', amount: '1000' })
    
    message.author.send(`Created code ${code}`)
    
  }
};
