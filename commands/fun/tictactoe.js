const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
      name: 'tictactoe',
      category: 'fun',
      description: 'Play a round of TicTacToe against another Discord user',
      usage: '<@user>',
      aliases: ['ttt'],
      run: async (client, message, args) => {

        message.delete()

    const lang = require(`../../DATA/languages/en-US.json`);

    const mention = message.mentions.members.first();
    const validation = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (!mention) return message.channel.send(lang.tictactoe_nomention);
    if (mention.presence.status === 'offline') return message.reply(lang.tictactoe_notoline);
    if (mention.user.bot) return message.channel.send(lang.tictactoe_botmention);
    if (message.author.id === mention.id) return message.channel.send(lang.tictactoe_error);

    let wantToPlayMessage;
    let wantToPlay;
    try {
      const wannaplay = lang.tictactoe_wannaplay.replace('%mention', mention).replace('%author', message.author);
      wantToPlayMessage = await message.channel.send(wannaplay);
      wantToPlay = await message.channel.awaitMessages((message2) => message2.author.id === mention.id, {
        max: 1,
        time: 60000,
        errors: ['time']
      });
    }
    catch (error) {
      return wantToPlayMessage.delete();
    }

    if (wantToPlay.first().content.toLowerCase() !== 'yes') {
      const gamecanceled = lang.tictactoe_gamecanceled.replace('%mention', mention.user.tag);
      return message.reply(gamecanceled);
    }

    await wantToPlayMessage.delete();
    await wantToPlay.first().delete();

    await message.channel.send(`${lang.tictactoe_gamecreated} 😼`);
    let gameEmbed = new Discord.MessageEmbed()
      .setTitle(lang.tictactoe_title)
      .setDescription('``` 1 | 2 | 3 \n---|---|--  \n 4 | 5 | 6 \n---|---|--  \n 7 | 8 | 9```')
      .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
      .setColor('BLUE');
    const game = await message.channel.send({
      embed: gameEmbed
    });

    try {
      const yourTurnMessage = await message.channel.send(`${message.author}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message.author.id === message2.author.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 1;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', message.author);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message2.author.id === mention.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 2;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', message.author).replace('%author', mention);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${message.author}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message.author.id === message2.author.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 1;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', message.author);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message2.author.id === mention.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 2;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', message.author).replace('%author', mention);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${message.author}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message.author.id === message2.author.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 1;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', message.author);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message2.author.id === mention.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 2;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', message.author).replace('%author', mention);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    const winnerEmbed = new Discord.MessageEmbed()
      .setTitle(lang.tictactoe_gameend)
      .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
      .setColor('GREEN');

    if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${message.author}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message.author.id === message2.author.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 1;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', message.author);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message2.author.id === mention.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 2;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', message.author).replace('%author', mention);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    }

    try {
      const yourTurnMessage = await message.channel.send(`${message.author}, ${lang.tictactoe_turn} ‼`);
      const response1 = await message.channel.awaitMessages((message2) => message.author.id === message2.author.id && message2.content > 0 && message2.content < 10 && validation[message2.content - 1] === 0, {
        max: 1,
        time: 15000,
        errors: ['time']
      });

      await yourTurnMessage.delete();
      await response1.first().delete();

      const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === message.author.id ? 'X' : 'O');
      gameEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_title)
        .setDescription(editedDescription)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('BLUE');

      await game.edit({
        embed: gameEmbed
      });
      validation[response1.first().content - 1] = 1;
    }
    catch (error) {
      const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', message.author);
      const noAnswerEmbed = new Discord.MessageEmbed()
        .setTitle(lang.tictactoe_noanswertitle)
        .setDescription(noanswer)
        .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
        .setColor('RED');
      return message.channel.send({
        embed: noAnswerEmbed
      });
    }

    if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
      const win = lang.tictactoe_win.replace('%user', message.author);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    } if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
      const win = lang.tictactoe_win.replace('%user', mention);
      winnerEmbed.setDescription(win);
      return message.channel.send({
        embed: winnerEmbed
      });
    }
    const drawEmbed = new Discord.MessageEmbed()
      .setTitle(lang.tictactoe_gameend)
      .setDescription(lang.tictactoe_draw)
      .setFooter(`${message.author.tag} vs ${mention.user.tag}`)
      .setColor('ORANGE');

    return message.channel.send({
      embed: drawEmbed
    });
  }
};