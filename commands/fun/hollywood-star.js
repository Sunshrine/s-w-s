const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('https://cdn.glitch.com/b2b15323-e58a-4732-9d2a-32c99acc49bc%2FHollywoodStar.otf?v=1589843442666', { family: 'Hollywood Star' });

module.exports = {
  name: 'hollywood-star',
	aliases: ['hollywood', 'walk-of-fame', 'walk-of-fame-star'],
  description: 'Sends a Hollywood Walk of Fame star with the name of your choice.',
  usage: '<text>',
  category: 'fun',
  run: async (client, message, args) => {
    
    let text = args.slice(0).join(' ')
    
    if(!text) return message.reply('please put some text!')
    if(text > 30) return message.reply('oops! Looks like that\'s more than 30 characters long.')
    
    
  }
}