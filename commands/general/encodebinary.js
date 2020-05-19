const fetch = require("node-fetch");

module.exports = {
    name: "encodebinary",
    category: "general",
    description: "Encode text to binary!",
    usage: "<text>",
    aliases: ["eb", "ebinary"],
    run: async (client, message, args) => {
        if(message.deletable) message.delete()

        let encodebinaryname = args.slice(0).join(" ")

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/binary?text=${encodebinaryname}`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to encode to binary!");

            let binary = body.binary
            message.channel.send(`**🇬🇧 ENGLISH: ${encodebinaryname}** \n**⛓️ BINARY: ${binary}**`)

            msg.delete()

        }).catch(err => {
            if(body.Error && body.Response === "false" || err) return message.channel.send(`Cannot encode ${encodebinaryname}!`)
            console.error(err)
        })
    }
}