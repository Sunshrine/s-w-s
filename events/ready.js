const { MessageEmbed } = require("discord.js"),
      figlet = require('figlet'),
      boxen = require('boxen'),
      db = require('quick.db')

module.exports = async (client, message) => {
  
  let check = db.fetch(`restartCentauri`)
  if(check !== null) {
    let status = db.fetch(`restartCentauri.status`)
    if(status !== null && status === 'on') {
      let messageID = db.fetch(`restartCentauri.messageID`)
      let channelID = db.fetch(`restartCentauri.channelID`)
      
      if(!channelID || !channelID.length || !messageID || !messageID.length) return;
      let channel = client.channels.cache.get(channelID)
      if(!channel) return;
      
      let message = channel.messages.fetch(messageID)
      .then(() => {
        if(!message) return
        message.edit()
      })
    }
  }
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
}