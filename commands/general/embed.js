const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    aliases: ["emb"],
    category: "general",
    description: "Creates a embed!",
    usage: "for more details.",
    run: async (client, message, args) => {

        if(message.deletable) message.delete();

    let embed = new MessageEmbed()
    .setTitle()
    .setDescription()
    .setAuthor(`Embed Available!`)
    .setTimestamp()
    .setColor()
    .setFooter()
    .addField("Embed Creator", message.member, true);
    let embedmsg = await message.channel.send(embed)
    let changedembed = await message.channel.send("What would you like the title to be?")

    let filter = m => !m.author.bot && m.author.id === message.author.id;
    message.channel.awaitMessages(filter, { max: 1 })
    .then(collected => {
        console.log(`Collected ${collected.first().content}!`)
        embed.setTitle(collected.first().content)
        embedmsg.edit(embed);
        changedembed.edit("Next, what would you like the description to be?")
        collected.first().delete();
        message.channel.awaitMessages(filter, { max: 1 })
        .then(collected => {
            console.log(`Collected ${collected.first().content}!`)
            embed.setDescription(collected.first().content)
            embedmsg.edit(embed);
            changedembed.edit("Also, what would you like the color to be (hex code)? Send `random` for a random color!")
            collected.first().delete();
            message.channel.awaitMessages(filter, { max: 1 })
            .then(collected => {
                console.log(`Collected ${collected.first().content}!`)
                if(collected.first().content.toLowerCase() === "random") {
                    embed.setColor("RANDOM")
                    embedmsg.edit(embed)
                    changedembed.edit("Now, what would like the footer to be?")
                    collected.first().delete();
                    message.channel.awaitMessages(filter, { max: 1 })
                    .then(collected => {
                        console.log(`Collected ${collected.first().content}!`)
                        embed.setFooter(collected.first().content)
                        embedmsg.edit(embed)
                        collected.first().delete();
                        changedembed.edit("Would you like to set an image? Y/N?")
                        message.channel.awaitMessages(filter, { max: 1 })
                        .then(collected => {
                            if(collected.first().content.toLowerCase() === "yes") {
                                changedembed.edit("If so yes, put input a valid image url!")
                                collected.first().delete();
                                message.channel.awaitMessages(filter, { max: 1 })
                                .then(collected => {
                                    console.log(`Collected ${collected.first().content}!`)
                                    embed.setImage(`${collected.first().content}`)
                                    embedmsg.edit(embed)
                                    collected.first().delete();
                                    changedembed.edit("Successfully created embed!").then(m => m.delete({"timeout": 1000}))
                                })
                        } else {
                                console.log(`Collected ${collected.first().content}!`)
                                collected.first().delete();
                                changedembed.edit("Successfully created embed!").then(m => m.delete({"timeout": 1000}))
                        }
                    })})
                } else {
                embed.setColor(collected.first().content)
                embedmsg.edit(embed)
                collected.first().delete();
                changedembed.edit("Now, what would like the footer to be?")
                message.channel.awaitMessages(filter, { max: 1 })
                    .then(collected => {
                        embed.setFooter(collected.first().content)
                        embedmsg.edit(embed)
                        collected.first().delete();
                        changedembed.edit("Would you like to set an image? Y/N?")
                        message.channel.awaitMessages(filter, { max: 1 })
                        .then(collected => {
                            console.log(`Collected ${collected.first().content}!`)
                            collected.first().delete();
                            changedembed.edit("Successfully created embed!").then(m => m.delete({"timeout": 1000}))
                        })
                    })
            }})
        })
                })
            }
        }
    
            
    