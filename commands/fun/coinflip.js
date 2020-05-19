module.exports = {
    name: "coinflip",
    description: "Flip the coins. Tells if it is a tails or heads.",
    category: "fun",
    aliases: ["flipthecoin"],
    run: async (client, message, args) => {
      
        message.delete()

        let random = (Math.floor(Math.random() * Math.floor(2)));

        if(random === 0) {
          message.channel.send('I flipped heads!');
        }
        else {
          message.channel.send('I flipped tails!');
        }
    }
}