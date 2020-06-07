module.exports = {
        name: "reload",
        description: "Reloads a bot command!",
        category: "owner",
        aliases: ["creload"],
        run: async (client, message, args) => {

            message.delete()

    if(message.author.id != "685371966022352928") return message.channel.send("You're not the bot the owner!").then(m => m.delete({ "timeout": 1500 }))

    if(!args[0]) return message.channel.send("Please provide a command to reload!").then(m => m.delete({ "timeout": 1500 }))

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        client.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        client.commands.set(commandName, pull)
    } catch(e) {
        message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``).then(m => m.delete({ "timeout": 1500 }))
        return console.log(e)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`).then(m => m.delete({ "timeout": 1500 }))
        }
    }
