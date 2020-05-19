const { inspect } = require("util")

module.exports = { 
        name: "eval",
        description: "Evaluates code",
        type: "owner",
        usage: "<input>",
        run: async (client, message, args) => {

            message.delete()

    if(message.author.id == "685371966022352928") {
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``).then(m => m.delete({ "timeout": 1500 }))
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
            }
            
        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``).then(m => m.delete({ "timeout": 1500 }))
        }

      } else {
        return message.reply("You are not the bot owner!").then(m => m.delete({ "timeout": 5000 }))
      }
    }
}