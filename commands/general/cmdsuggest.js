const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'cmdsuggest',
    category: 'general',
    description: 'Suggest a command in a specific category.',
    usage: 'for more details',
    run: async (client, message, args) => {

        let category;
        let suggestion;

        message.delete()

        const categories = new MessageEmbed()
        .setAuthor('Please wait for the emojis to show up.')
        .setTitle('Command Categories')
        .setDescription('\`\`🎉\`\` **Fun** \n\`\`🧮\`\` **General** \n\`\`🖼️\`\` **Images** \n\`\`ℹ️\`\` **Info** \n\`\`🛠️\`\` **Mod** \n\`\`🔞\`\` **NSFW** \n\`\`💰\`\` **Coins** \n\`\`⚙️\`\` **Bot Settings**')
        .setColor('#4eff4e')
        .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL())
        let categoriesmsg = await message.channel.send(categories)
        categoriesmsg.react('🎉')
        categoriesmsg.react('🧮')
        categoriesmsg.react('🖼️')
        categoriesmsg.react('ℹ️')
        categoriesmsg.react('🛠️') 
        categoriesmsg.react('⚙️').then(() => {
            categories.setAuthor('React to choose category.')
            categoriesmsg.edit(categories)
        })


        let cmdsuggestion = new MessageEmbed()
        .setTitle('🔔 You have gotten a command suggestion. 🔔')
        .setDescription(`You have gotten a command suggestion from ${message.guild.name}.`)


        let centralserver = await client.guilds.cache.get('692650451979731024').channels.cache.find(channel => channel.name === 'cmd-suggestions')

        const filter = (reaction, user) => {
            return user.id === message.author.id;
        };

        let filter2 = m => !m.author.bot && m.author.id === message.author.id;

        categoriesmsg.awaitReactions(filter, { max: 1 })
        .then(async (collected) => {
            if(collected.first().emoji.name === '🎉') {
                categoriesmsg.reactions.removeAll()
                categories
                .setTitle('Fun Category')
                .setDescription('Please type your suggestion for the Fun category.')
                .setAuthor('You have chosen the Fun category.')
                category = 'Fun'
                categoriesmsg.edit(categories)
                message.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    console.log(`Collected ${collected.first().content}!`)
                    suggestion = collected.first().content
                    cmdsuggestion.addField('Category', category, true)
                    cmdsuggestion.addField('Suggestion Author', message.member, true)
                    cmdsuggestion.addField('\u200b', '\u200b')
                    cmdsuggestion.addField('Suggestion', suggestion)
                    centralserver.send(cmdsuggestion)
                    collected.first().delete()
                    categories.setAuthor('Operation sucess.')
                    categories.setTitle('✅ Suggestion Sent ✅')
                    categories.setDescription('Your suggestion has been sent.')
                    categoriesmsg.edit(categories).then(m => m.delete({ "timeout": 5000 }))
                })
            }
            if(collected.first().emoji.name === '🧮') {
                categoriesmsg.reactions.removeAll()
                categories
                .setTitle('General Category')
                .setDescription('Please type your suggestion for the General category.')
                .setAuthor('You have chosen the General category.')
                category = 'General'
                categoriesmsg.edit(categories)
                message.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    console.log(`Collected ${collected.first().content}!`)
                    suggestion = collected.first().content
                    cmdsuggestion.addField('Category', category, true)
                    cmdsuggestion.addField('Suggestion Author', message.member, true)
                    cmdsuggestion.addField('\u200b', '\u200b')
                    cmdsuggestion.addField('Suggestion', suggestion)
                    centralserver.send(cmdsuggestion)
                    collected.first().delete()
                    categories.setAuthor('Operation success.')
                    categories.setTitle('✅ Suggestion Sent ✅')
                    categories.setDescription('Your suggestion has been sent.')
                    categoriesmsg.edit(categories).then(m => m.delete({ "timeout": 5000 }))
                })
            }
            if(collected.first().emoji.name === '🖼️') {
                categoriesmsg.reactions.removeAll()
                categories
                .setTitle('Images Category')
                .setDescription('Please type your suggestion for the Images category.')
                .setAuthor('You have chosen the Images category.')
                category = 'Images'
                categoriesmsg.edit(categories)
                message.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    console.log(`Collected ${collected.first().content}!`)
                    suggestion = collected.first().content
                    cmdsuggestion.addField('Category', category, true)
                    cmdsuggestion.addField('Suggestion Author', message.member, true)
                    cmdsuggestion.addField('\u200b', '\u200b')
                    cmdsuggestion.addField('Suggestion', suggestion)
                    centralserver.send(cmdsuggestion)
                    collected.first().delete()
                    categories.setAuthor('Operation success.')
                    categories.setTitle('✅ Suggestion Sent ✅')
                    categories.setDescription('Your suggestion has been sent.')
                    categoriesmsg.edit(categories).then(m => m.delete({ "timeout": 5000 }))
                })
            }
            if(collected.first().emoji.name === 'ℹ️') {
                categoriesmsg.reactions.removeAll()
                categories
                .setTitle('Info Category')
                .setDescription('Please type your suggestion for the Info category.')
                .setAuthor('You have chosen the Info category.')
                category = 'Info'
                categoriesmsg.edit(categories)
                message.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    console.log(`Collected ${collected.first().content}!`)
                    suggestion = collected.first().content
                    cmdsuggestion.addField('Category', category, true)
                    cmdsuggestion.addField('Suggestion Author', message.member, true)
                    cmdsuggestion.addField('\u200b', '\u200b')
                    cmdsuggestion.addField('Suggestion', suggestion)
                    centralserver.send(cmdsuggestion)
                    collected.first().delete()
                    categories.setAuthor('Operation success.')
                    categories.setTitle('✅ Suggestion Sent ✅')
                    categories.setDescription('Your suggestion has been sent.')
                    categoriesmsg.edit(categories).then(m => m.delete({ "timeout": 5000 }))
                })
            }
            if(collected.first().emoji.name === '🛠️') {
                categoriesmsg.reactions.removeAll()
                categories
                .setTitle('Mod Category')
                .setDescription('Please type your suggestion for the Mod category.')
                .setAuthor('You have chosen the Mod category.')
                category = 'Mod'
                categoriesmsg.edit(categories)
                message.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    console.log(`Collected ${collected.first().content}!`)
                    suggestion = collected.first().content
                    cmdsuggestion.addField('Category', category, true)
                    cmdsuggestion.addField('Suggestion Author', message.member, true)
                    cmdsuggestion.addField('\u200b', '\u200b')
                    cmdsuggestion.addField('Suggestion', suggestion)
                    centralserver.send(cmdsuggestion)
                    collected.first().delete()
                    categories.setAuthor('Operation success.')
                    categories.setTitle('✅ Suggestion Sent ✅')
                    categories.setDescription('Your suggestion has been sent.')
                    categoriesmsg.edit(categories).then(m => m.delete({ "timeout": 5000 }))
                })
            }
            if(collected.first().emoji.name === '💰') {
                categoriesmsg.reactions.removeAll()
                categories
                .setTitle('Coins Category')
                .setDescription('Please type your suggestion for the Coins category.')
                .setAuthor('You have chosen the Coins category.')
                category = 'Coins'
                categoriesmsg.edit(categories)
                message.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    console.log(`Collected ${collected.first().content}!`)
                    suggestion = collected.first().content
                    cmdsuggestion.addField('Category', category, true)
                    cmdsuggestion.addField('Suggestion Author', message.member, true)
                    cmdsuggestion.addField('\u200b', '\u200b')
                    cmdsuggestion.addField('Suggestion', suggestion)
                    centralserver.send(cmdsuggestion)
                    collected.first().delete()
                    categories.setAuthor('Operation sucess.')
                    categories.setTitle('✅ Suggestion Sent ✅')
                    categories.setDescription('Your suggestion has been sent.')
                    categoriesmsg.edit(categories).then(m => m.delete({ "timeout": 5000 }))
                })
            }
            if(collected.first().emoji.name === '⚙️') {
                categoriesmsg.reactions.removeAll()
                categories
                .setTitle('Bot Settings Category')
                .setDescription('Please type your suggestion for the Bot Settings category.')
                .setAuthor('You have chosen the Bot Settings category.')
                category = 'Bot Settings'
                categoriesmsg.edit(categories)
                message.channel.awaitMessages(filter2, { max: 1 })
                .then(collected => {
                    console.log(`Collected ${collected.first().content}!`)
                    suggestion = collected.first().content
                    cmdsuggestion.addField('Category', category, true)
                    cmdsuggestion.addField('Suggestion Author', message.member, true)
                    cmdsuggestion.addField('\u200b', '\u200b')
                    cmdsuggestion.addField('Suggestion', suggestion)
                    centralserver.send(cmdsuggestion)
                    collected.first().delete()
                    categories.setAuthor('Operation sucess.')
                    categories.setTitle('✅ Suggestion Sent ✅')
                    categories.setDescription('Your suggestion has been sent.')
                    categoriesmsg.edit(categories).then(m => m.delete({ "timeout": 5000 }))
                })
            }
        })


    }
}