const { Util, MessageEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.YOUTUBE_KEY);
const ytdl = require("ytdl-core");

module.exports = {
  name: 'search',
  description: 'Searches for a video or playlist',
  category: 'music',
  aliases: ['sc'],
  usage: '[title]',
  run: async (client, message, args) => {
    
    const argX = message.content.split(" ");
    const searchString = argX.slice(1).join(" ");
    const url = args[1] ? argX[1].replace(/<(.+)>/g, "$1") : "";
    const serverQueue = client.queue.get(message.guild.id);
         

const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("I'm sorry but you need to be in a voice channel to play a music!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) {
            return message.channel.send("Sorry, but I need **`CONNECT`** permissions to proceed!");
        }
        if (!permissions.has("SPEAK")) {
            return message.channel.send("Sorry, but I need **`SPEAK`** permissions to proceed!");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send(`<:yes:591629527571234819>  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    message.channel.send(`
__**Song selection**__
${videos.map(video2 => `**\`${++index}\`  |**  ${video2.title}`).join("\n")}
Please provide a value to select one of the search results ranging from 1-10.
					`);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            max: 1,
                            time: 10000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send("No or invalid value entered, cancelling video selection...");
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send("🆘  **|**  I could not obtain any search results.");
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    
        async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = client.queue.get(message.guild.id);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true,
            loop: false
        };
        client.queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            client.queue.delete(message.guild.id);
            return message.channel.send(`I could not join the voice channel: **\`${error}\`**`);
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return;
        else return message.channel.send(`<:yes:591629527571234819>  **|** **\`${song.title}\`** has been added to the queue!`);
    }
    return;
}

    function play(guild, song) {
    const serverQueue = client.queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        return client.queue.delete(guild.id);
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on("finish", () => {
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolume(serverQueue.volume / 100);

    serverQueue.textChannel.send({
        embed: {
            color: "RANDOM",
            description: `🎶  **|**  Start Playing: **\`${song.title}\`**`
        }
    });
  }
    
  }
}