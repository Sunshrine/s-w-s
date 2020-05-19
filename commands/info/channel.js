const { MessageEmbed } = require('discord.js');
const channelTypes = {
    dm: 'DM',
    group: 'Group DM',
    text: 'Text Channel',
    voice: 'Voice Channel',
    category: 'Category',
    unknown: 'Unknown',
};

module.exports = {
    name: 'channel',
    description: 'provides detailed infos about a particular channel in the guild',
    usage: '[channel name]',
    category: 'info',
    run: async (client, message, args) => {

        message.delete()
        
        const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first() || message.channel; 

        if (!channel) {
            return message.reply('Please enter a valid channel.');
        }
       
        const channelEmbed = new MessageEmbed()
                .setColor(0x00AE86)
                .setThumbnail(message.guild.iconURL)
                .setTitle('Channel Info')
                .addField(':arrow_right: Name', channel.type === 'dm' ? `<@${channel.recipient.username}>` : channel.name, true)
                .addField(':arrow_right: ID', channel.id, true)
                .addField(':arrow_right: Creation Date', channel.createdAt.toDateString(), true)
                .addField(':arrow_right: NSFW', channel.nsfw ? 'Yes' : 'No', true)
                .addField(':arrow_right: Category', channel.parent ? channel.parent.name : 'None', true)
                .addField(':arrow_right: Type', channelTypes[channel.type], true)
                .addField(':arrow_right: Topic', channel.topic || 'None', true);

        message.channel.send(channelEmbed);
    },
}