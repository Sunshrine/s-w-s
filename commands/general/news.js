const Discord = require('discord.js');

module.exports = {
      name: 'news',
      group: 'searches',
      description: 'Use this command to request news from different newspaper',
      format: '<newspaper>',
      run: async (client, message, args) => {
    const lang = require(`../../DATA/languages/en-US.json`);
    const api = message.client.newsapi;

    let index = 0;
    const margs = message.content.split(' ');

    const validationofnewspaper = ['abc-news-au', 'al-jazeera-english', 'ars-technica', 'associated-press', 'bbc-news', 'bbc-sport', 'bild', 'bloomberg', 'breitbart-news', 'business-insider', 'business-insider-uk', 'buzzfeed', 'cnbc', 'cnn', 'daily-mail', 'der-tagesspiegel', 'die-zeit', 'engadget'];

    const newsnotexist = lang.news_newsnotexist.replace('%newslist', validationofnewspaper.join(', '));
    const newspaper = new Discord.MessageEmbed()
      .setDescription(newsnotexist)
      .setColor('#76c65d');

    if (!margs[1]) return message.channel.send({ embed: newspaper });
    for (let i = 0; i < margs.length; i += 1) {
      if (validationofnewspaper.indexOf(margs[i].toLowerCase()) >= 0) {
        if (margs[1].toLowerCase() === 'bild') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'abc-news-au') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'al-jazeera-english') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'ars-technica') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'associated-press') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'bbc-news') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'bbc-sport') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'ars-technica') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'bloomberg') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'breitbart-news') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'business-insider') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'business-insider-uk') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'buzzfeed') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'cnbc') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'cnn') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'daily-mail') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'der-tagesspiegel') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'latest'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'die-zeit') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'latest'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              max: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
        else if (margs[1].toLowerCase() === 'engadget') {
          const r = await api.articles({
            source: margs[1],
            sortBy: 'top'
          });
          const embed = new Discord.MessageEmbed()
            .setColor('#76c65d')
            .setDescription(r.articles.map((article) => `**${++index} -** ${article.title}`).join('\n'));
          message.channel.send({
            embed
          });
          try {
            const response1 = await message.channel.awaitMessages((message2) => message2.content > 0 && message.author.id === message2.author.id, {
              maxMatches: 1,
              time: 20000,
              errors: ['time']
            });
            try {
              const embed2 = new Discord.MessageEmbed()
                .setAuthor(r.articles[response1.first().content - 1].author ? r.articles[response1.first().content - 1].author : lang.news_noauthor)
                .setURL(r.articles[response1.first().content - 1].url)
                .setColor('#76c65d')
                .setDescription(r.articles[response1.first().content - 1].description ? r.articles[response1.first().content - 1].description : lang.news_nodescription)
                .setImage(r.articles[response1.first().content - 1].urlToImage)
                .setFooter(`${r.source.toUpperCase()} || ${r.articles[response1.first().content - 1].publishedAt ? r.articles[response1.first().content - 1].publishedAt : lang.news_nopubdate}`);
              return message.channel.send({
                embed: embed2
              });
            }
            catch (error) {
              return message.channel.send(lang.news_articlenotexist);
            }
          }
          catch (error) {
            return message.channel.send(lang.news_noanswer);
          }
        }
      }
    }
    message.channel.send({ embed: newspaper });
  }
};