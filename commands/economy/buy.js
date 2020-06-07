const fs = require('fs');
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'buy',
  description: 'Buy an item from the Centashop!',
  category: 'economy',
  aliases: ['purchase'],
  usage: '[item name]',
  run: async (client, message, args) => {

let categories = []; // Lets define categories as an empty array so we can add to it.

        // We want to make it so that if the item is not specified it shows a list of items
        if (!args.join(" ")) { // Run if no item specified...

            // First, we need to fetch all of the categories.
            for (var i in items) { // We can do this by creating a for loop.

                // Then, lets push the category to the array if it's not already in it.
                if (!categories.includes(items[i].type)) {
                    categories.push(items[i].type)
                }

            }

            // Now that we have the categories we can start the embed
            const embed = new MessageEmbed()
                .setDescription(`Available Items`)
                .setColor(0xD4AF37)

            for (var i = 0; i < categories.length; i++) { // This runs off of how many categories there are. - MAKE SURE YOU DELETE THAT = IF YOU ADDED IT.

                var tempDesc = '';

                for (var c in items) { // This runs off of all commands
                    if (categories[i] === items[c].type) {

                        tempDesc += `${items[c].name} - $${items[c].price} - ${items[c].description}\n`; // Remember that \n means newline

                    }

                }

                // Then after it adds all the items from that category, add it to the embed
                embed.addField(categories[i], tempDesc);

            }

            // Now we need to send the message, make sure it is out of the for loop.
            return message.channel.send({
                embed
            }); // Lets also return here.

            // Lets test it! x2

        }

        // Buying the item.

        // Item Info
        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';

        for (var i in items) { // Make sure you have the correct syntax for this.
            if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) { // If item is found, run this...
                itemName = items[i].name;
                itemPrice = items[i].price;
                itemDesc = items[i].desc;
            }
        }

        // If the item wasn't found, itemName won't be defined
        if (itemName === '') {
            return message.channel.send(`**Item ${args.join(" ").trim()} not found.**`)
        }

        // Now, lets check if they have enough money.
        let coinBalance = db.fetch(`coinBalance_${message.author.id}`)
        if(!coinBalance || coinBalance === null || coinBalance === undefined) coinBalance = 0// Lets fix a few errors - If you use the unique guild thing, do this.
            if (coinBalance < itemPrice) { // It's supposed to be like this instead...
                return message.channel.send(`**You don't have enough money for this item.**`);
            } else {
              if(itemName === 'Centapremium') {
                    let premium = db.fetch(`userData_${message.author.id}.indexed.premium`)
    
                    if(!premium || premium === null || premium === undefined) premium = 'none'
                if(premium === 'none') {
                      db.subtract(`coinBalance_${message.author.id}`, parseInt(itemPrice))
                      message.channel.send('**You bought ' + itemName + '!**');
                      db.set(`userData_${message.author.id}.indexed.premium`, 'Unlimited')
                      message.channel.send('Added premium to user!')
                }
    
                if(premium !== null || premium !== undefined || premium !== 'none') return message.reply('you  already has premium!')
              
            } else {
                      db.subtract(`coinBalance_${message.author.id}`, parseInt(itemPrice))
                      message.channel.send('**You bought ' + itemName + '!**');
              db.push(`userData_${message.author.id}.inventory`, itemName)
            }
          }




       
  }
}
