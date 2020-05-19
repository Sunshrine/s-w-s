const fetch = require("node-fetch");

module.exports = {
    name: "decodebase64",
    category: "general",
    description: "Decode base64 to text!",
    usage: "<text>",
    aliases: ["db64", "dbase64"],
    run: async (client, message, args) => {
        if(message.deletable) message.delete()

        let decodebase64name = args.slice(0).join(" ")

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/base64?decode=${decodebase64name}`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to decode from base64!");

            let text = body.text
            message.channel.send(`**⛓️ BASE64: ${decodebase64name}** \n**🇬🇧 ENGLISH: ${text}**`)

            msg.delete()

        }).catch(err => {
            if(body.Error && body.Response === "false" || err) return message.channel.send(`Cannot decode ${decodebase64name}!`)
            console.error(err)
        })
    }
}