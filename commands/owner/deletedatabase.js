const db = require('quick.db')

module.exports = {
  name: 'deletedatabase',
  description: 'Delete databases with a name.',
  usage: '<database name>',
  aliases: ['ddb'],
  category: 'owner',
  run: async (client, message, args) => {
    
    let found = db.fetch(`${args.slice(0).join(' ')}`)
    
    if(!found) return message.reply('there is no database with that name.')
    
    if(found) {
      db.delete(`${args[0]}`)
      message.reply(`successfully deleted database ${args.slice(0).join(' ')}`)
    }
  }
}