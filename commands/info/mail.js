const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "mail",
    description: "Send mail!",
    category: "info",
    usage: "<user | id> <mail>",
    run: async (client, message, args) => {

        if(message.deletable) message.delete()
        
        let mailauthor = message.member
        if(!message.mentions.members.array()[0] && isNaN(args[0])) message.reply(`please mention someone or input an ID.`)
        let mailmember =       message.mentions.members.first() ||
      client.users.cache.find(u => u.username === args[0]) ||
      client.users.cache.get(args[0]);
        if(!mailmember) return message.channel.send("Please give me a member to email!")
        let mail = args[1] && args.slice(1).join(" ");
        if(!mail) return message.channel.send("Give me something to mail!")
        let mailembed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('📨 You got some mail! 📨')
        .setDescription('You have gotten some mail! React with 📩 to reply!')
        .addField('Mail From:', message.member)
        .addField('Mail:', mail)

        let sentmail = await client.users.cache.get(mailmember.id).send(mailembed).catch(err => {
            console.error(err)
            message.channel.send(`**Cannot send mail to ${mailmember}...`).then(m => m.delete({"timeout": 5000}))
        })
        sentmail.react('📩')

        const filter = (reaction, user) => {
            return reaction.emoji.name === '📩' && user.id === mailmember.id;
        };

        let filter2 = m => !m.author.bot;

        sentmail.awaitReactions(filter, { max: 1 })
        .then(async (collected) => {
            console.log(`Collected ${collected.size} reaction/s.`)
                let replymsg = await mailmember.send('What would you like the reply to be?')
                replymsg.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    let replyembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('📨 You got a reply! 📨')
                    .setDescription('You have a reply on one of your mails!')
                    .addField('Mail:', `\`\`\`${mail}\`\`\``)
                    .addField('Reply:', collected.first().content)
                    mailauthor.send(replyembed)
                })
        })

        message.channel.send(`You have successfully sent your mail of \`\`${mail}\`\` to ${mailmember}!`).then(m => m.delete({"timeout": 5000}))
    }
}