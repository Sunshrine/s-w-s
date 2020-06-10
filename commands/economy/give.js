const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "give",
  description: "Give a user an item from your inventory.",
  usage: "<user> <item>",
  category: "economy",
  aliases: ["giveitem"],
  run: async (client, message, args) => {
    const nouserembed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`<:no:720295035085783103> Please mention a user!`);

    const noitemembed = new MessageEmbed()
      .setColor("RED")
      .setDescription(`<:no:720295035085783103> Please input an item!`);

    const itemdoesnotexist = new MessageEmbed()
      .setColor("RED")
      .setDescription(
        `<:no:720295035085783103> That item does not exist; either you don't have it or it isn't a valid item!`
      );
    
    if (!message.mentions.members.first()) return message.reply(nouserembed);
    if (!args[1]) return message.reply(noitemembed);

    let user = message.mentions.members.first();

    let inventory = await db.get(`userData_${message.author.id}.inventory`);
    if (!inventory || !inventory.length) inventory = "No items bought."
    let inventory2 = await db.get(`userData_${message.author.id}.inventory`);
      
    let sorted = inventory2.map(v => v.toLowerCase());
    if(!sorted.includes(args[1].toLowerCase())) return message.reply(itemdoesnotexist)
    

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
    
        const gifteditem = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `<:yes:720295144296939651> You have sent item \`\`${args[1].replace(
          /^./,
          v => v.toUpperCase()
        )}\`\` to ${user}!`
      );


    
    db.push(
      `userData_${user.user.id}.inventory`,
      args[1].replace(/^./, v => v.toUpperCase())
    );
    let x = removeItemOnce(inventory, args[1].replace(/^./, v => v.toUpperCase()))
    db.set(`userData_${message.author.id}.inventory`, x)
    
    await message.reply(gifteditem)
  }
};
