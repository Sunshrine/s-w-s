const request = require('node-superfetch');

module.exports = {
    name: 'googleautofil',
    description: 'Responds with a list of the Google Autofill results for a particular query.',
    aliases: ['google-autocomplete', 'autofill', 'autocomplete'],
    category: 'general',
    usage: '<query>',
    run: async (client, message, args) => {

        message.delete()

        const query = args.slice(0).join(" ");

try {
    const { text } = await request
        .get('https://suggestqueries.google.com/complete/search')
        .query({
            client: 'firefox',
            q: query
        });
    const data = JSON.parse(text)[1];
    if (!data.length) return message.channel.send('Could not find any results.').then(m => m.delete({ "timeout": 1500 }))
    return message.channel.send(data.join('\n'));
} catch (err) {
    return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`).then(m => m.delete({ "timeout": 1500 }))
}
    }
}