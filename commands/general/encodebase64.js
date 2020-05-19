const fetch = require("node-fetch");

module.exports = {
    name: "encodebase64",
    category: "general",
    description: "Encode text to base64!",
    usage: "<text>",
    aliases: ["eb64", "ebase64"],
    run: async (client, message, args) => {
        if(message.deletable) message.delete()

        let encodebase64name = args.slice(0).join(" ")

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/base64?encode=${encodebase64name}`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to encode to base64!");

            let base64 = body.base64
            message.channel.send(`**🇬🇧 ENGLISH: ${encodebase64name}** \n**⛓️ BASE64: ${base64}**`)

            msg.delete()

        }).catch(err => {
            if(body.Error && body.Response === "false" || err) return message.channel.send(`Cannot encode ${encodebase64name}!`)
            console.error(err)
        })
    }
}