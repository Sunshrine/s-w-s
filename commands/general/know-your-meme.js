const request = require('node-superfetch');
const cheerio = require('cheerio');
const { MessageEmbed } = require('discord.js');
const { shorten } = require('../../util/Util');

module.exports = {
      name: 'know-your-meme',
			aliases: ['kym', 'meme-info', 'meme-search'],
			group: 'search',
			memberName: 'know-your-meme',
			description: 'Searches Know Your Meme for your query.',