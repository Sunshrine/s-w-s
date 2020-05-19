const { createCanvas, loadImage } = require('canvas')
const request = require('node-superfetch')

module.exports = {
  name: 'needs-more-jpeg',
	aliases: ['jpeg', 'jpegify'],
	category: 'edit-image',
  usage: '[user | attachment]',
	description: 'Draws an image or a user\'s avatar as a low quality JPEG.',
  run: async (client, message, args) => {
    
    let quality = parseInt(args[0]) 
    
    let image = message.mentions.users.first().displayAvatarURL({ format: 'png', size: 512 }) || message.attachments.first() ? message.attachments.first().proxyURL : null || message.author.displayAvatarURL({ format: 'png', size: 512 })
    
    if(message.mentions.users.array[0]) quality = parseInt(args[1])
    if(isNaN(quality)) return message.reply(`${args[1]} is not a valid number.`)
    
    try {
			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(data, 0, 0);
			const attachment = canvas.toBuffer('image/jpeg', { quality: quality / 10 });
			if (Buffer.byteLength(attachment) > 8e+6) return message.reply('resulting image was above 8 MB.');
			return message.channel.send({ files: [{ attachment, name: 'needs-more-jpeg.jpeg' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
  }
}