const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  name: 'roulette',
  description: 'Gamble your coins on the roulette!',
  usage: '<red | black | green> <amount>',
}
