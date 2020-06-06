const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  var time = new Date();
  console.log(`${time.toLocaleTimeString({}, { timeZone: 'Etc/GMT-2' })} || Ping Received`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://sunshrine-centauri.glitch.me`)
}, 280000);

const { Client, Collection, MessageEmbed, MessageAttachment } = require("discord.js");
const { config } = require("dotenv");
const NewsAPI = require('newsapi')


const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Map();

config({
    path: __dirname + "/.env"
});

const fs = require("fs");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.afk = new Map();
client.killed = new Map();
client.blacklistedChannels = new Map();
client.blacklistedUsers = new Map();


client.newsapi = new NewsAPI('6dd7f7c3adaa4e3f8e47d38ffa9234c3');
client.queue = new Map()
client.starboard = new Map()
client.settings = new Map()

client.login(process.env.TOKEN);
