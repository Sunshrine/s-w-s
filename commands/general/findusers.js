module.exports = {
    name: 'findusers',
    description: 'Return all the usernames that contains the specified letters',
    usage: '<username>',
    category: 'general',
    run: async (client, message, args) => {

        message.delete()
        
        const users = client.users;

        const searchTerm = args[0];
        if (!searchTerm) {
            return message.channel.send('Please provide a search term.');
        }

        const matches = users.cache.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()));
        if (!matches) {
            return message.channel.send('No username matches');
        }
        else {
            if((matches.map(u => u.tag).join(', ')) > 2000) return message.channel.send('There are over 2000 characters in that message, Discord can\'t take that! ;(')
            return message.channel.send(matches.map(u => u.tag).join(', '));
        }
    },
}