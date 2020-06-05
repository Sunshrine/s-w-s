const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require('quick.db');
const { stripIndents } = require("common-tags");


module.exports = {
        name: "help",
        aliases: ["h"],
        usage: "[command name] (optional)",
        category: "info",
        description: "Displays all commands that the bot has.",
    run: async (client, message, args) => {
        let botPrefix;
        let fetched = db.get(`botPrefix_${message.guild.id}`)

        if (!fetched || fetched === null) {
            botPrefix = process.env.DEFAULT_PREFIX
        }
      
      if(fetched && fetched !== null) botPrefix = fetched

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
            .setThumbnail(client.user.displayAvatarURL())

        if (!args[0]) {

            const sembed = new MessageEmbed()
                .setAuthor(`${message.guild.me.displayName}`, message.guild.iconURL())
                .setColor("GREEN")
                .setDescription('**Message Has Been Sent to You In DMs!**')
            message.channel.send(sembed).then(msg => {
                msg.delete({ timeout: 10000 });
            })

            const categories = readdirSync("./commands/")

            embed.setDescription(`**These Are the Available Commands For ${message.guild.me.displayName}\nBot's Global Prefix Is \`${process.env.DEFAULT_PREFIX}\`\nServer Prefix Is \`${botPrefix}\`\n\nFor Help Related To A Particular Command Type -\n\`${botPrefix}help [command name | alias]\`**`)
            embed.setFooter(`${message.guild.me.displayName} | Total Commands - ${client.commands.size}`, client.user.displayAvatarURL());

          categories.forEach(category => {
                const dir = client.commands.filter(c => c.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                  embed.addField(` ${capitalise} [${dir.size}] - `, dir.map(c => `\`${c.name}\``).join(" "))
                } catch (e) {
                    console.log(e)
                }
          })
   

            return message.author.send(embed).catch(err => {
              if(err) async () => {
                sembed.setDescription('**Failed to send commands in DMs, sending here instead...**')
                let x = await message.channel.send(sembed)
                setTimeout(() => {
                  x.delete()
                  message.channel.send(embed)
                }, 2000)
                           
              }
            })
        } else {
          
                  let botPrefix;
        let fetched = db.get(`botPrefix_${message.guild.id}`)

        if (!fetched || fetched === null) {
            botPrefix = process.env.DEFAULT_PREFIX
        }
          
      if(fetched && fetched !== null) botPrefix = fetched
          
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${botPrefix}help\` For the List Of the Commands!**`))

            embed.setDescription(stripIndents`
            ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            ** Description -** ${command.description || "No Description provided."}\n
            ** Usage -** ${command.usage ? `${botPrefix + command.name} ${command.usage}` : `No usage! Use like this: \`\`${botPrefix + command.name}\`\``}\n
            ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
            embed.setFooter(message.guild.name, message.guild.iconURL())

            return message.channel.send(embed)
        }
    }
};