const request = require("superagent")

module.exports = {
    name: 'advice',
    description: 'gives a random life advice',
    category: 'general',
    run: async (client, message, args) => {

        message.delete()

        request
        .get('http://api.adviceslip.com/advice')
        .end((err, res) => {
            if (!err && res.status === 200) {
                try {
                    JSON.parse(res.text)
                } catch (e) {
                    return message.reply('An API error occurred.');
                }
                const advice = JSON.parse(res.text)
                message.channel.send(`**\`\`\`${advice.slip.advice}\`\`\`**`)
            } else {
            console.error(`REST call failed: ${err}, status code: ${res.status}`)
            }
        });
    }
}