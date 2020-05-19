const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "howsimp",
    aliases: ["simpcalc", "hs", "simppercent"],
    category: "fun",
    description: "Find out how simp you are!",
    usage: "[@mention]",
    run: async (client, message, args) => {

        if (message.deletable) message.delete(); // To know if the the message with the command is deletable. If it is, it deletes it.
        let gMember = message.mentions.users.first() // Lets the first user mentioned become the gMember.
        
        var random = Math.floor(Math.random() * 100 + 1) // Creates a variable at which a random number is created.
        
        const noembed = new MessageEmbed() // Creates a new embed.
        .setThumbnail(client.user.displayAvatarURL()) // Uses the bot's picture as the thumbnail.
        .setAuthor(client.user.username, client.user.displayAvatarURL()) // Sets the author as the bot and showcases its picture.
        .setDescription("This is how simp you are using our professional measuring calculations!") // Sets the description of the embed.
        .addFields( // Adds fields.
            { name: '\u200B', value: '\u200B' }, // This is the blank space field.
		    { name: 'User', value: message.member, inline: true }, // This is a field titled User with a value of the member who made the command, with inline enabled.
		    { name: 'Simp Percentage', value: random, inline: true }, // This is a field titled Gay Percentage with a value of variable random, with inline enabled.
	)
        .setColor("RANDOM") // Sets the color of the embed to a random color every time the command is executed.
        .setImage(message.author.displayAvatarURL()); // Sets the image shown in the embed to the message author's picture.

        if (!gMember) return message.channel.send(noembed) // If no user is mentioned, it sends the noembed above.

        const yesembed = new MessageEmbed() // Creates a new embed.
        .setThumbnail(client.user.displayAvatarURL()) // Uses the bot's picture as the thumbnail.
        .setAuthor(client.user.username, client.user.displayAvatarURL()) // Sets the author as the bot and showcases its picture.
        .setDescription(`This is how simp ${gMember.username} is using our professional measuring calculations!`) // Sets the description of the embed.
        .addFields( // Adds fields.
            { name: '\u200B', value: '\u200B' }, // This is the blank space field.
		    { name: 'User', value: gMember, inline: true }, // This is a field titled User with a value of the mentioned user, with inline enabled.
		    { name: 'Simp Percentage', value: random, inline: true }, // This is a field titled Gay Percentage with a value of variable random, with inline enabled.
	)
        .setColor("RANDOM") // Sets the color of the embed to a random color every time the command is executed.
        .setImage(gMember.displayAvatarURL()); // Sets the image shown in the embed to the message author's picture.

        if (gMember) return message.channel.send(yesembed) // If a user is mentioned, it sends the yesembed above.

    },
}