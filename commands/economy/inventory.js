const { MessageEmbed } = require("discord.js");
const db = require("quick.db"),
      fs = require("fs")

module.exports = {
  name: "inventory",
  description: "View your inventory!",
  category: "iteminventory",
  aliases: ["useitem"],

  run: async (client, message, args) => {
    let inventory = db.fetch(`userData_${message.author.id}.inventory`);
    console.log(inventory);
    if (!inventory || !inventory.length) inventory = "No items bought.";

      const embed1 = new MessageEmbed()
        .setTitle(`Your Inventory || ${message.author.tag}`)
        .setDescription(`Your Items`)
        .addField("Items", inventory)
        .setColor("GREEN");
    
    message.channel.send(embed1)
      
    }
  }