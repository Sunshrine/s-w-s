const randomizeCase = word => word.split(" ").join(" ");

module.exports = {
  name: "clap",
  description: "Clapify your text.",
  usage: "<text>",
  category: "fun",
  aliases: ["clapify"],
  run: async (client, message, args) => {
    message.delete();

    if (args.length < 1)
      return message.channel
        .send("Please provide some text to clapify!")
        .then(m => m.delete({ timeout: 1500 }));

    message.channel.send(args.map(randomizeCase).join(" :clap: "));

    message.delete();
  }
};
