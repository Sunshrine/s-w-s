const { MessageEmbed } = require("discord.js"),
      figlet = require('figlet'),
      boxen = require('boxen')

module.exports = async (client, message) => {
  client.guilds.cache.forEach(async guild => {
    let x = await client.settings.get(guild.id);
    if (!x || x === null || x === undefined)
      client.settings.set(guild.id, {
        toggleStarboard: false,
        toggleWelcome: false,
        toggleAutoMod: false
      })
    client.settings.delete(guild.id)
    console.log(`Deleted ${guild.name} with ID ${guild.id} off the settign`)
  });
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
};
