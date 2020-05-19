const settings = require('../../settings.json')

module.exports = {
        name: "say",
        description: "Sends a message that was inputted to a channel!",
        usage: "<channel> <text>",
        category: "mod",
        aliases: ["acc", "announcement"],
        run: async (client, message, args) => {

            if (!settings.owners.includes(message.author.id)) return message.reply('you don\'t have permission to use this command...').then(m => m.delete({ "timeout": 1500 }))
    
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }

    }
}