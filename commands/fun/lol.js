const { WebhookClient } = require('discord.js')

module.exports = {
  name: '',
  description: '',
  category: '',
  usage: '',
  run: async (client, message, args) => {
    
    let member = message.mentions.users.first() || message.author
    let arg = args.slice(1).join(' ')
    
    if(!message.member.hasPermission(['ADMINISTRATOR'])) {
      message.delete()
      return message.reply('you don\'t have permission to use the \`\`lol\`\` command! \nMissing Permission: \`\`\ADMINSTRATOR`\`')
    }
    
    message.delete()
    let webhook = await message.channel.createWebhook(member.username, {
      avatar: member.displayAvatarURL({ dynamic: true })
    })
    
    const webhookClient = new WebhookClient(webhook.id, webhook.token)
    webhookClient.send(arg)
    
  }
}
