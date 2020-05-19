const Discord = require('discord.js');
const request = require('request-promise');

module.exports = {
      name: 'google',
      category: 'general',
      description: 'Searches something on google',
      usage: '<query>',
      aliases: ['g'],
      run: async (client, message, args) => {
    const lang = require(`../../DATA/languages/en-US.json`);
    const arguables = message.content.split(' ').slice(1);

    if (args.length < 1) {
      return message.reply(lang.google_noinput);
    }

    const filter = ['porno', 'xnxx', 'pornhub', 'porn', 'livesex', 'nsfw'];

    for (let i = 0; i < filter.length; i += 1) {
      if (args.includes(filter[i])) return message.channel.send(lang.google_nsfw);
    }

    const response = await request({
      headers: { 'User-Agent': 'Mozilla/5.0' },
      uri: 'https://www.googleapis.com/customsearch/v1',
      json: true,
      qs: {
        cx: process.env.GOOGLE_SEARCH_ID,
        key: process.env.GOOGLE_SEARCH_KEY,
        num: 1,
        q: args.join(' ')
      }
    }).catch((error) => console.error(error.response.body.error, message.channel));

    if (!response) return false;

    if (response.searchInformation.totalResults !== '0') {
      const result = response.items[0];
      const link = decodeURIComponent(result.link);

      const embed = new Discord.MessageEmbed()
        .setColor('#0066CC')
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        .setURL(link)
        .setTitle(result.title)
        .setDescription(result.snippet)
        .setFooter(result.link, result.link);

      if (result.pagemap && result.pagemap.cse_thumbnail) embed.setThumbnail(result.pagemap.cse_thumbnail[0].src);

      return message.channel.send({ embed });
    }
  }
};
