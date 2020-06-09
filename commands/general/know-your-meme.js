const request = require("node-superfetch");
const cheerio = require("cheerio");
const { MessageEmbed } = require("discord.js");
const utility = require('../../DATA/ignutility');

module.exports = {
  name: "know-your-meme",
  aliases: ["kym", "meme-info", "meme-search"],
  category: "general",
  description: "Searches Know Your Meme for your query.",
  run: async (client, message, args) => {
    
    const query = args.slice(0).join(" ");
    if (!query) message.reply("please enter a query!");
    
    try {
			const location = await search(query);
			if (!location) return message.say('Could not find any results.');
			const data = await fetchMeme(location);
			const embed = new MessageEmbed()
				.setColor(0x12133F)
				.setAuthor('Know Your Meme', 'https://i.imgur.com/WvcH4Z2.png', 'https://knowyourmeme.com/')
				.setTitle(data.name)
				.setDescription(utility.shorten(data.description || 'No description available.'))
				.setURL(data.url)
				.setThumbnail(data.thumbnail);
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	

	async function search(query) {
		const { text } = await request
			.get('https://knowyourmeme.com/search')
			.query({ q: query });
		const $ = cheerio.load(text);
		const location = $('.entry-grid-body').find('tr td a').first().attr('href');
		if (!location) return null;
		return location;
	}

	async function fetchMeme(location) {
		const { text } = await request.get(`https://knowyourmeme.com${location}`);
		const $ = cheerio.load(text);
		const thumbnail = $('a[class="photo left wide"]').first().attr('href')
			|| $('a[class="photo left "]').first().attr('href')
			|| null;
		return {
			name: $('h1').first().text().trim(),
			url: `https://knowyourmeme.com${location}`,
			description: getMemeDescription($),
			thumbnail
		};
	}

	function getMemeDescription($) {
		const children = $('.bodycopy').first().children();
		let foundAbout = false;
		for (let i = 0; i < children.length; i++) {
			const text = children.eq(i).text();
			if (foundAbout) {
				if (text) return text;
			} else if (text === 'About') {
				foundAbout = true;
			}
		}
		return null;
	}

  }
};
