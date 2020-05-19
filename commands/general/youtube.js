const Discord = require('discord.js');
const request = require('request');
const config = require('../../settings.json');

module.exports = {
      name: 'youtube',
      category: 'general',
      description: 'Searches for a video on youtube',
      usage: '<input>',
      aliases: ['yt'],
      run(client, message, args) {

        message.delete()

    const lang = require(`../../DATA/languages/en-US.json`);
    const prefix = "&"
    const arguables = message.content.split(' ').slice(1);

    if (!args[0]) {
      const noinput = lang.youtube_noinput.replace('%prefix', prefix);
      return message.channel.send(noinput);
    }
    const url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${arguables}&maxResults=1&type=video&key=${process.env.YOUTUBE_KEY}`;
    request(url, (err, response, body) => {
      if (err) {
        message.client.logger.error(err);
        return message.channel.send(lang.youtube_error);
      }
      const search = JSON.parse(body);
      try {
        const { title } = search.items[0].snippet;
        const thumbnail = search.items[0].snippet.thumbnails.medium.url;
        const { description } = search.items[0].snippet;
        const newUrl = `https://www.youtube.com/watch?v=${search.items[0].id.videoId}`;
        const embed = new Discord.MessageEmbed()
          .setImage(thumbnail)
          .setAuthor(title)
          .setDescription(description)
          .setURL(newUrl)
          .setColor(0x00AE86)
          .setFooter(newUrl);
        return message.channel.send({ embed });
      }
      catch (error) {
        return message.channel.send(lang.youtube_noresult);
      }
    });
  }
}