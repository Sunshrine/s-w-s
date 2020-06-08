const { randomKey } = require("../../functions.js"),
      db = require('quick.db'),
      fs = require('fs')
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));

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
    
    function pickRandomItem() {
        var obj_keys = Object.keys(items);
        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        items.selecteditem = items[ran_key];
        console.log(items.selecteditem.name)
}
  
    let code = makeid(15)
    
    db.set(`code-${code}`, { redeemed: 'unredeemed', type: 'coins', amount: '1000' })
    
    let code2 = makeid(15)
    
    db.set(`code-${code2}`, { redeemed: 'unredeemed', type: 'premium' })
    
    let code3 = makeid(15)
    let itemx = pickRandomItem()
    
    db.set(`code-${code3}`, { redeemed: 'unredeemed', type: 'item', item: itemx.name })
    
    message.author.send(`Created codes \`\`${code}\`\`, \`\`${code2}\`\`. and \`\`${code3}\`\` with item: ${itemx.name}`)
    
  }
};
