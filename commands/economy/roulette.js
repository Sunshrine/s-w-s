const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms"),
      settings = require('../../settings.json')

module.exports = {
  name: 'roulette',
  description: 'Gamble your coins on the roulette!',
  usage: '<red | black | green> <amount>',
  category: 'economy',
  aliases: ['roul'],
  run: async (client, message, args) => {
    
      let user = message.author;
    
    let cooldown = 1.8e+6

    let lastroulette = await db.fetch(`lastRoulette_${message.author.id}`)
    
    if(lastroulette !== null && cooldown - (Date.now() - lastroulette) > 0 && !settings.owners.includes(message.author.id)) {
      let timeobj = ms(cooldown - (Date.now() - lastroulette))
      
      let cooldowne = new MessageEmbed()
      
      cooldowne.setColor('RED')
      cooldowne.setTitle('Woah, woah, you\'re on cooldown!')
      cooldowne.setDescription(`${message.member}, please wait *${timeobj.minutes}* **minutes** and *${timeobj.seconds}* **seconds**!`)
      
      return message.channel.send(cooldowne)
    }

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let money = parseInt(args[1]);
let moneydb = await db.fetch(`coinBalance_${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌ Specify an amount to gamble | ${db.fetch(`botPrefix_${message.author.id}`)}roulette <color> <amount>`);

let moneymore = new MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌ You are betting more than you have`);

let colorbad = new MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌ Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 15
        db.add(`coinBalance_${user.id}`, money)
        let moneyEmbed1 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`🟢 You won ${money} coins\n\nMultiplier: 15x`);
        message.channel.send(moneyEmbed1)
        console.log(`${message.author.tag} Won ${money} on green`)
    } else if (isOdd(random) && colour == 1) { // Red
        money = parseInt(money * 1.5)
        db.add(`coinBalance_${user.id}`, money)
        let moneyEmbed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`🔴 You won ${money} coins\n\nMultiplier: 1.5x`);
        message.channel.send(moneyEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
        money = parseInt(money * 2)
        db.add(`coinBalance_${user.id}`, money)
        let moneyEmbed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`⚫ You won ${money} coins\n\nMultiplier: 2x`);
        message.channel.send(moneyEmbed3)
    } else { // Wrong
        db.subtract(`coinBalance_${user.id}`, money)
        let moneyEmbed4 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ You lost ${money} coins\n\nMultiplier: 0x`);
        message.channel.send(moneyEmbed4)
    }
    
          db.set(`lastRoulette_${message.author.id}`, Date.now())
  
  }
}

