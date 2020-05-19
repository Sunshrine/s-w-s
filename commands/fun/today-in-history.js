const request = require('node-superfetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'today-in-history',
    description: 'Gives info about what important event happend today in history.',
    category: 'fun',
    usage: '<month in number> <day in number>',
    aliases: ['tih'],
    run: async (client, message, args) => {

        message.delete()

        const month = parseInt(args[0]);
        const day = parseInt(args[1]);

        if(isNaN(month)) {
            return message.channel.send('Please enter a valid month').then(m => m.delete({ "timeout": 1500 }))
        }

        if(isNaN(day)) {
            return message.channel.send('Please enter a valid date').then(m => m.delete({ "timeout": 1500 }))
        }

        const date = month && day ? `/${month}/${day}` : '';
		try {
			const { text } = await request.get(`http://history.muffinlabs.com/date${date}`);
			const body = JSON.parse(text);
			const events = body.data.Events;
			const event = events[Math.floor(Math.random() * events.length)];
			const embed = new MessageEmbed()
				.setColor(0x9797FF)
				.setURL(body.url)
				.setTitle(`On this day (${body.date})...`)
				.setTimestamp()
				.setDescription(`${event.year}: ${event.text}`)
				.addField('❯ See More',
					event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join(', '));
            
            return message.channel.send(embed);
        } 
        catch (err) {
			if (err.status === 404 || err.status === 500) return message.channel.send('Invalid date.').then(m => m.delete({ "timeout": 1500 }))
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`).then(m => m.delete({ "timeout": 1500 }))
		}
    }
}