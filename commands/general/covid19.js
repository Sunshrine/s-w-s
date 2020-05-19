const fetch = require("node-fetch");

module.exports = {
  name: "covid19",
  description: "Get COVID-19 stats by country.",
  category: "general",
  aliases: ["coronavirus"],
  usage: "<country>",
  run: async (client, message, args) => {
    
    if (args[0] !== 'country' && args[0] !== 'total' && args[0] !== 'all' || !args[0])
      return message.reply(
        `**incorrect usage:** &covid19 country <country> **OR** &covid19 all/total`
      );
    
    let country;

    if(args[0] === "country") country = args[1] && args.slice(1).join(" ");

    if (args[0] === 'country' && !country)
      return message.reply("**please input a country name!**");

    if (args[0] === 'country' && country) {
      fetch(`https://disease.sh/v2/countries/${country}`)
        .then(res => res.json())
        .then(body => {
          if (!body)
            return message.channel.send("Unable to fetch COVID-19 stats!");
          if (body.message === "Country not found or doesn't have any cases")
            message.reply(
              `either that country has no cases, or ${country} is not a valid country.`
            );

          const { MessageEmbed } = require("discord.js");

          const date = new Date(body.updated).toLocaleString();

          let COVIDembed = new MessageEmbed()
            .setTitle(
              `COVID-19 Stats for ${
                body.country
              } - :flag_${body.countryInfo.iso2.toLowerCase()}:`
            )
            .setAuthor(`Last Updated: ${date}`)
            .setThumbnail(body.countryInfo.flag)
            .addField("Cases", body.cases)
            .addField("Today's Cases", body.todayCases)
            .addField("Deaths", body.deaths)
            .addField("Today's Deaths", body.todayDeaths)
            .addField("Recovered", body.recovered)
            .addField("Active Cases", body.active)
            .addField("Critical", body.critical)
            .addField("Tests", body.tests)
            .addField(
              "More Info",
              `**Cases Per One Million:** ${body.casesPerOneMillion}
\n**Deaths Per One Million:** ${body.deathsPerOneMillion}
\n**Tests Per One Million:** ${body.testsPerOneMillion}
\n**Active Per One Million:** ${body.activePerOneMillion}
\n**Recovered Per One Million:** ${body.recoveredPerOneMillion}
\n**Critical Per One Million:** ${body.criticalPerOneMillion}`
            )
            .addField(
              "Geographic Info",
              `**Continent:** ${body.continent}
\n**Population:** ${body.population}`
            )
            .setDescription(
              `Powered by the [NovelCOVID 19 API](https://disease.sh/)`
            );

          message.channel.send(COVIDembed);
        });
    }

    if (args[0] === 'all' || args[0] === 'total') {
      fetch(`https://disease.sh/v2/all`)
        .then(res => res.json())
        .then(body => {
          if (!body)
            return message.channel.send("Unable to fetch COVID-19 stats!");

          const { MessageEmbed } = require("discord.js");

          const date = new Date(body.updated).toLocaleString();

          let COVIDembed = new MessageEmbed()
            .setTitle(`Total COVID-19 Stats - The World`)
            .setAuthor(`Last Updated: ${date}`)
            .addField("Cases", body.cases)
            .addField("Today's Cases", body.todayCases)
            .addField("Deaths", body.deaths)
            .addField("Today's Deaths", body.todayDeaths)
            .addField("Recovered", body.recovered)
            .addField("Active Cases", body.active)
            .addField("Critical", body.critical)
            .addField("Tests", body.tests)
            .addField(
              "More Info",
              `**Cases Per One Million:** ${body.casesPerOneMillion}
\n**Deaths Per One Million:** ${body.deathsPerOneMillion}
\n**Tests Per One Million:** ${body.testsPerOneMillion}
\n**Active Per One Million:** ${body.activePerOneMillion}
\n**Recovered Per One Million:** ${body.recoveredPerOneMillion}
\n**Critical Per One Million:** ${body.criticalPerOneMillion}`
            )
            .addField(
              "Geographic Info",
              `**Affected Countries:** ${body.affectedCountries}
\n**Population:** ${body.population}`
            )
            .setDescription(
              `Powered by the [NovelCOVID 19 API](https://disease.sh/)`
            );

          message.channel.send(COVIDembed);
        });
    }
  }
};
