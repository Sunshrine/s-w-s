module.exports = {
  name: 'queue',
  description: 'Shows the song queue.',
  category: 'music',
  aliases: ['q'],
  run: async (client, message, args) => {
    
        const serverQueue = client.queue.get(message.guild.id);

        if (!serverQueue) return message.channel.send("There is nothing playing.");
        return message.channel.send(`
__**Song Queue**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
**Now Playing: \`${serverQueue.songs[0].title}\`**
        `);
      
      }
}