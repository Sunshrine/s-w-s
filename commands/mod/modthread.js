const { MessageEmbed } = require("discord.js")

module.exports = {
        name: "modthread",
        description: "Creates a mod thread channel!",
        usage: "[name]",
        category: "mod",
        run: async (client, message, args) => {

            let r = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
            let r1 = r[Math.floor(Math.random() * r.length)]
            let r2 = r[Math.floor(Math.random() * r.length)]
            let r3 = r[Math.floor(Math.random() * r.length)]
            let r4 = r[Math.floor(Math.random() * r.length)]
            let r5 = r[Math.floor(Math.random() * r.length)]
            let r6 = r[Math.floor(Math.random() * r.length)]
            let rdata = `${r1}${r2}${r3}${r4}${r5}${r6}`
            
message.delete()
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You don\'t have permission to use this command.").then(m => m.delete({ "timeout": 1500 }))
let channelname = args.slice(0).join(" ")
if(!channelname) channelname = rdata
let guild = message.guild;
let staffrole = guild.roles.cache.find(r => r.name.toLowerCase().includes("staff"))
let memberrole = guild.roles.cache.find(r => r.name.toLowerCase().includes("everyone"))

let correctname = `mt∕${channelname}`

if(!staffrole) return message.channel.send('There is no staff role.').then(m => m.delete({ "timeout": 1500 }))
if(!memberrole) return message.channel.send('There is no everyone role.').then(m => m.delete({ "timeout": 1500 }))

let modthreadchannel = await guild.channels.create(correctname, { type: "text" })
modthreadchannel.updateOverwrite(memberrole, {
    SEND_MESSAGES: false,
    ADD_REACTIONS: false,
    SEND_TTS_MESSAGES: false,
    ATTACH_FILES: false,
    SPEAK: false
})

modthreadchannel.updateOverwrite(staffrole, {
    SEND_MESSAGES: true,
    ADD_REACTIONS: true,
    SEND_TTS_MESSAGES: true,
    ATTACH_FILES: true,
    SPEAK: true
})

message.channel.send('Successfully created mod thread.').then(m => m.delete({ "timeout": 5000 }))
let modthreadembed = new MessageEmbed()
.setColor("#4eff4e")
.setTitle(`Welcome to ${modthreadchannel.name}.`)
.setDescription(`This thread was opened by ${message.member}. \nReact with **👌** to __**close**__ this thread.`)

let modthreadmsg = await modthreadchannel.send(modthreadembed)
modthreadmsg.react('👌')


const filter = (reaction, user) => {
	return reaction.emoji.name === '👌' && user.id === message.author.id;
};


modthreadmsg.awaitReactions(filter, { max: 1 })
.then(collected => {
    console.log(`Collected ${collected.first().name}`);
    modthreadmsg.reactions.removeAll()
    modthreadchannel.send('Channel will be deleted in 5 seconds.').then(m => m.delete({ "timeout": 2500 }))
    setTimeout(() => {
        modthreadchannel.delete()
    }, 5000);
});

        }
    }