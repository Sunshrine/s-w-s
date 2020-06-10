const { MessageEmbed } = require("discord.js");
const db = require("quick.db"),
      fs = require("fs")

module.exports = {
  name: "use",
  description: "Use an item from your inventory!",
  category: "economy",
  aliases: ["useitem"],
  usage: "[item name]",
  run: async (client, message, args) => {
    let inventory = db.fetch(`userData_${message.author.id}.inventory`);
    console.log(inventory);
    if (!inventory || !inventory.length) inventory = "No items bought.";

    if (!args[0]) {
      const embed1 = new MessageEmbed()
        .setTitle(`Your Inventory || ${message.author.tag}`)
        .setDescription(`Your Items`)
        .addField("Items", inventory)
        .setColor("GREEN");

      message.channel.send(embed1);
    } else {
      let inventory = await db.get(`userData_${message.author.id}.inventory`);
      let inventory2 = await db.get(`userData_${message.author.id}.inventory`);
      
      let sorted = inventory2.map(v => v.toLowerCase());
      if(!sorted.includes(args[0].toLowerCase())) return message.reply(`you don't have an item that matches that name.`)
    }


function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

      
      const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
          
    function pickItemMessage() {
        var obj_keys1 = Object.keys(items);
       var obj_keys = obj_keys1.filter(el => el === args[0].replace(/^./, v => v.toUpperCase()))
        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        items.selecteditem = items[ran_key];
        var selecteditem = items.selecteditem.usagemsg
        return selecteditem
}
      
      let msg = pickItemMessage()

      let x = removeItemOnce(inventory, args[0].replace(/^./, v => v.toUpperCase()))
      console.log(x)
      db.set(`userData_${message.author.id}.inventory`, x);
      message.channel.send(msg);
    
    }
  }

