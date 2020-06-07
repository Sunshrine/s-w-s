module.exports = {
        name: "restart",
        description: "Restarts the bot!",
        category: "owner",
        aliases: ["botrestart", "refresh", "reload", "res"],
        run: async (client, message, args) => {

    if(message.author.id != "685371966022352928") return message.channel.send("You're not the bot the owner!").then(m => m.delete({ "timeout": 1500 }))

    try {
        message.channel.send("<a:loading:719121979319255052> Attempting a restart...").then(msg => {
          msg.react('🆗');
          setTimeout(function() {
             msg.edit("<:success:719123112964128830> I should be back up now!");
          }, 10000);
        })
        .then(client.destroy())
        .then(client.login(process.env.TOKEN))




          } catch(e) {
            message.channel.send(`ERROR: ${e.message}`)
          }
    


    }
}