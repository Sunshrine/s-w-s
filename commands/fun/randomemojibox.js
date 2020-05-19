module.exports = {
    name: 'randomemojibox',
    category: 'fun',
    description: 'Get a random emoji box.',
    aliases: ['reb'],
    run: async (client, message, args) => {

        message.delete()

        let emojis = message.guild.emojis.cache.random()

        message.reply(`**here's your emoji box! || ${emojis} ||**`)
    }
}