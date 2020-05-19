const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'avatar',
    aliases: ['icon', 'logo', 'av'],
    description: 'display the image and url of users\' avatar',
    usage: '[tagged users]',
    category: "general",
    run: async (client, message, args) => {
        
        message.delete()

        {
            const user = message.mentions.users.first() || message.author
            if(!user)
                return message.reply('Please mention the user who you want the avatar from.');
        
            if(!user.displayAvatarURL())
                return message.channel.send(`That user does not have an avatar`);

                const avatar = new MessageEmbed()
                .setAuthor('Avatar generated.')
                .setImage(user.displayAvatarURL({ dynamic: true }))
                .setDescription(`[Click here to download the avatar.](${user.avatarURL({ dynamic: true })})`)

                message.channel.send(avatar)

        }
    }
}