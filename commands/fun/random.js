const rn = require("random-number");

module.exports = {
    name: 'random',
    description: 'Generates a random number between number1 and number2',
    usage: '<number1> <number2>',
    run: async (client, message, args) => {

        message.delete()

        const num1 = args.slice(0).join(' ');
        const num2 = args.slice(1).join(' ');
        if (num1.length < 1 || num2.length < 1) return message.reply('You must supply two numbers!').then(m => m.delete({ "timeout": 1500 }))
        const num12 = parseInt(num1);
        const num22 = parseInt(num2);
        var options = {
            min: num12
            , max: num22
            , integer: true
        };
        var number = rn(options);
        message.reply(`Your number between ${num12} and ${num22} is ${number}`);
    }
}