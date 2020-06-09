const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const { Client, Collection, MessageEmbed, MessageAttachment } = require("discord.js");
const { config } = require("dotenv");
const NewsAPI = require('newsapi')


const client = new Client({
    disableEveryone: true
});
const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBL_TOKEN, { webhookServer: listener, webhookAuth: 'mylittlecentauri' }, client);

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
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
client.usedcodes = new Collection()

client.login(process.env.TOKEN);
