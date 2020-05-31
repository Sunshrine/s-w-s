const { MessageEmbed } = require("discord.js"),
      figlet = require('figlet'),
      boxen = require('boxen'),
      { toCheckNitro, generateCode } = require('../functions.js')

module.exports = async (client, message) => {
  figlet.text('Centauri', {
      horizontalLayout: 'fitted'
  }, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    
  console.log(boxen(data, {padding: 1, margin: 1, borderStyle: 'double'}));
})
    
  console.log(`Hi, ${client.user.username} is now online!`);
  setInterval(() => {
    client.user.setPresence({
      activity: {
        name: "no u"
      },
      status: "dnd"
    });
    setTimeout(() => {
      client.user.setPresence({
        activity: {
          name: "&help"
        },
        status: "dnd"
      });
    }, 10000);
    setTimeout(() => {
      client.user.setPresence({
        activity: {
          name: `chillin' with my ${client.users.cache.array().length} friends`
        },
        status: "dnd"
      });
    }, 15000);
  }, 20000);
  
  let triesPerSecond = 0.0
  
  toCheckNitro(generateCode());
setInterval(() => {
    toCheckNitro(generateCode());
}, (1/triesPerSecond) * 100);
};
