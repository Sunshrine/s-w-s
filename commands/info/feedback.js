const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "feedback",
    description: "Send feedback to the bot's owner!",
    category: "info",
    usage: "<feedback>",
    run: async (client, message, args) => {

        if(message.deletable) message.delete()
        
        let feedback = args.slice(0).join(" ");
        let feedbackembed = new MessageEmbed()
        .setColor('#4eff4e')
        .setTitle('You got some feedback!')
        .setDescription('You have gotten some feedback about GalaxyBot!')
        .addField('Feedback From:', message.member)
        .addField('Feedback:', feedback)

        client.users.cache.get("685371966022352928").send(feedbackembed)
        message.channel.send(`You have successfully sent your feedback of \`\`${feedback}\`\` to the bot owner!`).then(m => m.delete({"timeout": 5000}))
    }
}