module.exports = {
  name: 'reverse',
  description: 'Reverse text.',
  category: 'general',
  aliases: ['backwards'],
  usage: '<text>',
  run: async (client, message, args) => {
    
    const text = args.slice(0).join(" ")
    
    if(!text) return message.reply('please input some text!')
    
    message.channel.send(text.split('').reverse().join(''))


  }
}