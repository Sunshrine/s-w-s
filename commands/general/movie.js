const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "movie",
    category: "general",
    description: "Generate and find movies!",
    usage: "<title>",
    run: async (client, message, args) => {

        message.delete()

        let moviename = args.slice(0).join(" ")

        let msg = await message.channel.send("Generating...")

        fetch(`http://www.omdbapi.com/?t=${moviename}&apikey=dd907956`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to fetch movie!").then(m => m.delete({ "timeout": 1500 }))
            

            const moviembed = new MessageEmbed()
            .setAuthor(`${client.user.username} MOVIES!`)
            .setColor("RANDOM")
            .setTitle(body.Title)
            .addField("Year", body.Year, true)
            .addField("Rated", body.Rated, true)
            .addField("Released", body.Released, true)
            .addField("Runtime", body.Runtime, true)
            .addField("Genre", body.Genre, true)
            .addField("Director", body.Director, true)
            .addField("Writer", body.Writer, true)
            .addField("Actors", body.Actors, true)
            .addField("Plot", body.Plot, true)
            .addField("Awards", body.Awards, true)
            .addField("IMDB Rating", body.imdbRating, true)
            .setImage(`${body.Poster}`)
            .setTimestamp()
            .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL());

            message.channel.send(moviembed);
            msg.delete();

        }).catch(err => {
            if(body.Error && body.Response === "false" || err) return message.channel.send(`No results for \`${moviename}\`!`)
            console.error(err)
        })

    }
}