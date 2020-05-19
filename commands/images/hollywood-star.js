const { createCanvas, loadImage, registerFont } = require("canvas"),
  { MessageEmbed, MessageAttachment } = require("discord.js"),
  premium = require("../../premiumusers.json");
registerFont("/app/HollywoodStar.otf", { family: "Hollywood Star" });

module.exports = {
  name: "hollywood-star",
  aliases: ["hollywood", "walk-of-fame", "walk-of-fame-star"],
  description:
    "Sends a Hollywood Walk of Fame star with the name of your choice.",
  usage: "<text>",
  category: "fun",
  run: async (client, message, args) => {
    if (!premium.users.includes(message.author.id))
      return message
        .reply("you don't have premium!")
        .then(m => m.delete({ timeout: 1500 }));

    let text = args.slice(0).join(" ");

    if (!text) return message.reply("please put some text!");
    if (text > 30)
      return message.reply(
        "oops! Looks like that's more than 30 characters long."
      );

    const base = await loadImage("/app/hollywood-star.png");
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(base, 0, 0);
    ctx.font = "28px Hollywood Star";
    ctx.fillStyle = "#fadfd4";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(text.toLowerCase(), 288, 140);

    const hollywood_img = new MessageAttachment(
      canvas.toBuffer(),
      "hollywood-star.png"
    );

    const hollywood_embed = new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(
        `__**Credits**__
                    \n[RedKid.net](http://www.redkid.net/): Image \|| [http://www.redkid.net/generator/star/](click here for generator) 
                    \n[Alexey Star](https://alexeystar.com/):  Font - [https://alexeystar.com/hollywood-star-font/](click here for font)
                    \nHollywood Walk of Fame: Concept - [https://walkoffame.com/](click here to visit url)`
      )
      .attachFiles(hollywood_img);

    message.channel.send(hollywood_embed);
  }
};
