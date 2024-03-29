const request = require('superagent');

module.exports = {
    name: 'momma',
    description: 'Get a random yo momma joke',
    category: 'fun',
    aliases: ['yomama'],
    cooldown: 5,
    run: async (client, message, args) => {
      
        message.delete()

        request
          .get('http://api.yomomma.info/')
          .end((err, res) => {
            if (!err && res.status === 200) {
              try {
                JSON.parse(res.text);
              }
              catch (e) {
                return message.reply('The API returned an unconventional response.');
              }
              const joke = JSON.parse(res.text);
              message.channel.send(joke.joke);
            } else {
              console.error(`REST call failed: ${err}`);
            }
          });
        }
    }