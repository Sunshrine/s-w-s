const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    category: "general",
    description: "Creates a poll!",
    usage: "for more details.",
    run: async (client, message, args) => {

        if(message.deletable) message.delete();

    let embed = new MessageEmbed()
    .setTitle()
    .setColor("RANDOM")
    .setDescription()
    .setAuthor(`Poll Available!`)
    .setTimestamp()
    .addField("Poll Creator", message.member, true);
    let embedmsg = await message.channel.send(embed)
    let changedembed = await message.channel.send("What would you like the title to be?")

    const filter = (reaction, user) => {
	    return user.id === message.author.id;
    };

    let filter2 = m => !m.author.bot && m.author.id === message.author.id;

    message.channel.awaitMessages(filter2, { max: 1 })
    .then(collected => {
        console.log(`Collected ${collected.first().content}!`)
        embed.setTitle(collected.first().content)
        embedmsg.edit(embed);
        changedembed.edit("Next, what would you like the description to be?")
        collected.first().delete();
        message.channel.awaitMessages(filter2, { max: 1 })
        .then(collected => {
            console.log(`Collected ${collected.first().content}!`)
            embed.setDescription(collected.first().content)
            embedmsg.edit(embed);
            changedembed.edit("Also, what would you 2 reactions to be? React them to this message!")
            collected.first().delete();
            changedembed.awaitReactions(filter, { max: 2 })
                .then(collected => {
                embedmsg.react(collected.first().emoji)
                embedmsg.react(collected.last().emoji)
                changedembed.reactions.removeAll()
                changedembed.edit("Successfully created poll!").then(m => m.delete({"timeout": 5000}))
                })
            })
    })

    }
}
