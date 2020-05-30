const { WebhookClient } = require("discord.js");

module.exports = {
  name: "lol",
  description: "Creates a fake message that looks like it came from a user.",
  category: "fun",
  usage: "[user] <query>",
  run: async (client, message, args) => {
    let member = message.mentions.users.first() || message.author;
    let arg;

    if (message.mentions.users.array()[0]) {
      arg = args.slice(1).join(' ')
    } else arg = args.slice(0).join(' ')

    if (!message.member.hasPermission(["ADMINISTRATOR"])) {
      message.delete();
      return message.reply(
        "you don't have permission to use the ``lol`` command! \nMissing Permission: ``ADMINSTRATOR``"
      );
    }

    if (!arg) {
      message.delete();
      return message.reply("please enter something!");
    }

    message.delete();

    const webhooks = await message.channel.fetchWebhooks();
    const myWebhooks = webhooks.filter(
      webhook =>
        webhook.owner.id === client.user.id && webhook.name === member.username
    );
    
    if(myWebhooks || myWebhooks.size !== 0 || myWebhooks !== null ? null : undefined) {
      let instance1 = new WebhookClient(myWebhooks.id, myWebhooks.token)
      instance1.send(arg)
    } else {
      let instance2 = message.channel.createWebhook(member.username, {
        avatar: member.displayAvatarURL()
      }).then(instance2 => {
        instance2.send(arg)
      })
    }

  },
};
