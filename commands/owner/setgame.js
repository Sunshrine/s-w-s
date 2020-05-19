const settings = require('../../settings.json');

module.exports = {
    name: 'setgame',
    description: 'Sets a new game status for the bot',
    usage: '<new status>',
    category: 'owner',
    run: async (client, message, args) => {

      message.delete()

    const lang = require(`../DATA/languages/en-US.json`);
    const newstatus = args.slice(0).join(" ");
    const prefix = require(`../../index`)
    if (!settings.owners.includes(message.author.id)) return message.channel.send(lang.botownercommands_error).then(m => m.delete({ "timeout": 1500 }))

    const setgame_error = lang.setgame_error.replace('%prefix', prefix);
    if (!newstatus) return message.reply(setgame_error);

    await client.user.setActivity(`${newstatus}`, { type: 'PLAYING' })
    return message.channel.send(lang.setgame_done).then(m => m.delete({ "timeout": 1500 }))
  }
}