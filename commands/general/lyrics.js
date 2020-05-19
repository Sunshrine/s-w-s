const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  name: "lyrics",
  category: "general",
  description: "Generate and find lyrics of a song!",
  usage: "<title>",
  run: async (client, message, args) => {
    const scrapeLyrics = path => {
      return axios
        .get(path)
        .then(response => {
          let $ = cheerio.load(response.data);
          return [
            $(".header_with_cover_art-primary_info-title")
              .text()
              .trim(),
            $(".lyrics")
              .text()
              .trim()
          ];
        })
        .catch(err => {
          console.warn(err);
        });
    };

    const searchLyrics = url => {
      return Promise.resolve(
        axios
          .get(url, { Authorization: `Bearer ${process.env.GENIUS_KEY}` })
          .then(response => checkSpotify(response.data.response.hits))
          .then(path => scrapeLyrics(path))
          .catch(err => {
            console.warn(err);
          })
      );
    };

    const checkSpotify = hits => {
      return hits[0].result.primary_artist.name === "Spotify"
        ? hits[1].result.url
        : hits[0].result.url;
    };

    message.delete();

    let query = args.slice(0).join(" ");
    if (!query)
      return message.reply(`**Incorrect Format:** Please provide a song name!`);

    let msg = await message.channel.send("Generating...");

    const baseURL = `https://api.genius.com/search?access_token=${process.env.GENIUS_KEY}`;

    searchLyrics(`${baseURL}&q=${encodeURIComponent(query)}`)
      .then(songData => {
        const embed = new MessageEmbed()
          .setColor(0x00ae86)
          .setTitle(`Lyrics for: ${songData[0]}`)
          .setDescription(songData[1]);
        return message.channel.send({ embed });
      })
      .catch(err => {
        message.channel.send(`No lyrics found for: ${query} 🙁`, {
          code: "asciidoc"
        });
        console.warn(err);
      });
  }
};
