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

    let inventory = db.get(`userData_${message.author.id}.inventory`);
    if (!inventory || !inventory.length) inventory = "No items bought.";
    let lowerCaseInventory = inventory.map(v => v.toLowerCase());
    if (!lowerCaseInventory.includes(args[1].toLowerCase()))
      return message.reply(itemdoesnotexist);

    Array.prototype.remove = function() {
      var what,
        a = arguments,
        L = a.length,
        ax;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    
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
    let x = inventory.remove(args[1]);
    db.set(`userData_${message.author.id}.inventory`, x)
    
    await message.reply(gifteditem)
  }
};
