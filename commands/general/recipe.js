const { MessageEmbed } = require("discord.js");
const request = require("node-superfetch");

module.exports = {
  name: "recipe",
  aliases: ["recipe-puppy"],
  category: "search",
  description: "Searches for recipes based on your query.",
  run: async (client, message, args) => {
    const query = args.slice(0).join(" ");
    if (!query) message.reply("please enter a query!");

    try {
      const { text } = await request
        .get("http://www.recipepuppy.com/api/")
        .query({ q: query });
      const body = JSON.parse(text);
      if (!body.results.length)
        return message.say("Could not find any results.");
      const recipe =
        body.results[Math.floor(Math.random() * body.results.length)];
      const embed = new MessageEmbed()
        .setAuthor(
          "Recipe Puppy",
          "https://i.imgur.com/lT94snh.png",
          "http://www.recipepuppy.com/"
        )
        .setColor(0xc20000)
        .setURL(recipe.href)
        .setTitle(recipe.title)
        .setDescription(`**Ingredients:** ${recipe.ingredients}`)
        .setThumbnail(recipe.thumbnail);
      return message.channel.send(embed);
    } catch (err) {
      if (err.status === 500) return message.say("Could not find any results.");
      return message.reply(
        `oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  }
};
