const encode = require('strict-uri-encode')

module.exports = {
  name: 'lmgtfy',
  description: 'Get LMGTFY results!',
  category: 'general',
  usage: '<query>',
  run: async (client, message, args) => {
    
    if(!args.join(" ")) return message.reply('**please input a query!**')
    
    let question = encode(args.join(' '));
    
    let link = `https://www.lmgtfy.com/?q=${question}`
    
    message.delete()
    message.channel.send(`**<${link}>**`)
    
  }
}