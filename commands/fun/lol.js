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
      arg = args[1];
    } else arg = args[0];

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

    if (myWebhooks.size === 0) {
      let webhookr = await message.channel.createWebhook(member.username, {
              avatar: member.displayAvatarURL({ dynamic: true })
            });

            const webhookClient = new WebhookClient(webhookr.id, webhookr.token);
            webhookClient.send(arg);
    }
    for (let [id, webhook] of myWebhooks)
      await webhook
        .delete(`Requested by ${message.author.tag}`)
        .then(async () => {
          const webhooks2 = await message.channel.fetchWebhooks();
          const myWebhooks2 = webhooks.filter(
            webhook =>
              webhook.owner.id === client.user.id &&
              webhook.name === member.username
          );
          if (myWebhooks2.size === 0 || !myWebhooks2) {
            let webhooke = await message.channel.createWebhook(member.username, {
              avatar: member.displayAvatarURL({ dynamic: true })
            });

            const webhookClient = new WebhookClient(webhooke.id, webhooke.token);
            webhookClient.send(arg);
          }
        });
  }
};
