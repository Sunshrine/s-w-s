const fetch = require("node-fetch");

module.exports = {
    name: "decodebinary",
    category: "general",
    description: "Decode binary to text!",
    usage: "<text>",
    aliases: ["db", "dbinary"],
    run: async (client, message, args) => {
        if(message.deletable) message.delete()

        let decodebinaryname = args.slice(0).join(" ")

        let msg = await message.channel.send("Generating...")

        fetch(`https://some-random-api.ml/binary?decode=${decodebinaryname}`).then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Unable to decode to binary!");

            let text = body.text
            message.channel.send(`\n**⛓️ BINARY: ${decodebinaryname}** \n**🇬🇧 ENGLISH: ${text}**`)

            msg.delete()

        }).catch(err => {
            if(body.Error && body.Response === "false" || err) return message.channel.send(`Cannot decode ${decodebinaryname}!`)
            console.error(err)
        })
    }
}