module.exports = {
  name: 'nowplaying',
  description: 'Shows what\'s currently playing.',
  category: 'music',
  aliases: [''],
  usage: '',
  run: async (client, message, args) => {
    
        const serverQueue = client.queue.get(message.guild.id);

if (!serverQueue) return message.channel.send("There is nothing playing.");
        return message.channel.send(`🎶  **|**  Now Playing: **\`${serverQueue.songs[0].title}\`**`);
      
      }
}