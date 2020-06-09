module.exports = {
        name: "restart",
        description: "Restarts the bot!",
        category: "owner",
        aliases: ["botrestart", "refresh", "reload", "res"],
        run: async (client, message, args) => {
          
          const token = process.env.TOKEN,
                db = require('quick.db')

    if(message.author.id != "685371966022352928") return message.channel.send("You're not the bot the owner!").then(m => m.delete({ "timeout": 1500 }))

    try {
        let sx = await message.channel.send("<a:loading:719121979319255052> Attempting a restart...")
        
        
        console.log('Restarting bot!')
      sx.edit('Restarting...')
        .then(() => {
       db.set(`restartCentauri`, { status: 'on', messageID: sx.id, channelID: sx.channel.id })
        }).then(() => {
         process.exit(1)
       })

        
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


    }
}