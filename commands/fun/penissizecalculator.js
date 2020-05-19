module.exports = {
    name: 'penissizecalculator',
    group: 'fun',
    description: 'Calculates the size of the penis of you or a user',
    usage: '[@user]',
    aliases: ['psc', 'ppcalc'],
    run: async (client, message, args) => {

        message.delete()

        const lang = require(`../../DATA/languages/en-US.json`);

        const pscAnswers = [];
        for (const x in lang) {
          if (x.includes('penissizecalculator_answer')) {
            pscAnswers.push(lang[x]);
          }
        }
        const pscAnswersIndex = Math.floor(Math.random() * pscAnswers.length);    
    
        if (!message.mentions.members.first()) {
          return message.channel.send(`${message.author}, ${pscAnswers[pscAnswersIndex]}`);
        }
        message.channel.send(`${message.mentions.members.first().displayName}, ${pscAnswers[pscAnswersIndex]}`);

        }
    }