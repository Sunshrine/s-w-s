const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "channelsettings",
    description: "Sets channel variables like topic and name.",
    aliases: ["setchannel", "channelsetup"],
    category: "mod",
    run: async (client, message, args) => {
        if(!message.member.hasPermission(["ADMINISTRATOR" || "MANAGE_CHANNELS"])) return message.channel.send("Sorry, you can't use this command!")
        message.delete();

        if(args[0] === "-settopic") {
            let mentionchannel = args[1] && message.mentions.channels.first()
            let newtopic = args[2] && args.slice(2).join(" ");
            if (!mentionchannel) {
                mentionchannel = message.channel
                newtopic = args[1] && args.slice(1).join(" ");
            }
            mentionchannel.setTopic(newtopic)
            .then(updated => console.log(`Channel's new topic is ${updated.topic}`))
            .catch(console.error);
        }

        if(args[0] === "-newcategory") {
            let categoryname = args[1] && args.slice(1).join(" ");
            if(!categoryname) return message.channel.send('Give me a name for the new category!')
            let categoryguild = message.guild
            categoryguild.channels.create(categoryname, { type: 'category' })
            .catch(console.error)
        }

        if(args[0] === "-newtextchannel") {
            let textchannelname = args[1] && args.slice(1).join(" ");
            if(!textchannelname) return message.channel.send('Give me a name for the new text channel!')
            let textchannelguild = message.guild
            textchannelguild.channels.create(textchannelname, { type: 'text' })
            .catch(console.error)
        }

        if(args[0] === "-newvoicechannel") {
            let voicechannelname = args[1] && args.slice(1).join(" ");
            if(!voicechannelname) return message.channel.send('Give me a name for the new voice channel!')
            let voicechannelguild = message.guild
            voicechannelguild.channels.create(voicechannelname, { type: 'voice' })
            .catch(console.error)
        }

        if(args[0] === "-editchannelname") {
            let newnamechannel = args[1] && message.mentions.channels.first()
            let newname = args[2] && args.slice(2).join(" ");
            if (!newnamechannel) {
                newnamechannel = message.channel
                newname = args[1] && args.slice(1).join(" ");
            }
            newnamechannel.edit({ name: newname })
            .catch(console.error)
        }

        if(args[0] === "-deletechannel") {
            let delchannel = args[1] && message.mentions.channels.first()
            let delreason = args[2] && args.slice(2).join(" ");
            if (!delchannel) {
                delchannel = message.channel
                delreason = args[1] && args.slice(1).join(" ");
            }
            if(!delreason) delreason = "No reason specified."
            delchannel.delete({ reason: delreason })
            .catch(console.error)
        }

        if(args[0] === "-deletecategory") {
            let delcategoryname = args[1] && args.slice(1).join(" ");
            let delcategoryguild = message.guild
        const delcategory = delcategoryguild.channels.cache.find(channel => channel.name.includes(delcategoryname) && channel.type === 'category')
        delcategory.delete()
            .catch(err => {
                console.error(err)
                message.channel.send('Invalid category name, please give me the exact category name!').then(m => m.delete({ "timeout": 1000}))
            })
        }
    }
}