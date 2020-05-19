const Discord = require('discord.js');
const btcValue = require('btc-value');

module.exports = {
    name: 'bitcoin',
    category: 'general',
    description: 'Shows you information from Bitcoin (value and percentage of changes from the last day).',
    run: async (client, message, args) => {

      message.delete()

    const lang = require(`../../DATA/languages/en-US.json`);

    const value = await btcValue({ isDecimal: true });
    const hourPercentage = await btcValue.getPercentageChangeLastHour();
    const dayPercentage = await btcValue.getPercentageChangeLastDay();
    const weekPercentage = await btcValue.getPercentageChangeLastWeek();

    const descriptionembed = lang.bitcoin_descriptionembed.replace('%value', value).replace('%daypercentage', dayPercentage).replace('%hourpercentage', hourPercentage)
      .replace('%weekpercentage', weekPercentage);

    const embed = new Discord.MessageEmbed()
      .setDescription(descriptionembed)
      .setColor('#ff6600')
      .setAuthor(lang.bitcoin_authorembed);

    message.channel.send({
      embed
    });
}}