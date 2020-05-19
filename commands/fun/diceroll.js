module.exports = {
    name: 'diceroll',
    description: 'Rolls a dice with a given number of sides, default numebr of sides is 6.',
    usage: '[number of sides]',
    category: 'fun',
    aliases: ['dice'],
    run: async (client, message, args) => {

        message.delete()
        
        if(!args[0]) {
            args[0] = 6;
          }

          let result = (Math.floor(Math.random() * Math.floor(args[0])));
          message.channel.send(`I rolled ${result + 1}!`);
    },
};