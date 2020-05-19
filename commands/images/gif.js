const request = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'gif',
    description: 'Generates a random gif based on the topic you provided.',
    usage: '[topic]',
    category: 'images',
    cooldown: 5,
    run: async (client, message, args) => {

        message.delete()

        request
            .get('http://api.giphy.com/v1/gifs/random')
            .set('api_key', 'dc6zaTOxFJmzC')
            .query({ rating: message.channel.nsfw === true ? 'r' : 'pg13', fmt: 'json' })
            .query(`tag=${args.join('+')}`)
            .then(res => {
                if (res.statusCode !== 200 || res.body.meta.status !== 200) return console.log('API_ERROR')
                if (res.body.data.id !== undefined) {
                    const gifembed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} GIFS!`, message.guild.iconURL)
                    .setImage(`http://media.giphy.com/media/${res.body.data.id}/giphy.gif`)
                    .setTimestamp()
                    .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());
                    message.channel.send(gifembed)
                } else {
                    return console.log(`BOORU_NO_RESULTS, ${args}`);
                }
            });
    },
};