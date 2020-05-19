const cows = require('cows')
const rn = require('random-number')

module.exports = {
    name: 'cow',
    description: 'Sends a cow, what do you expect?',
    category: 'fun',
    run: async (client, message, args) => {

        message.delete()
        
        const options = {
            min: 0,
            max: cows().length - 1,
            integer: true
        };
        const random = rn(options);
        message.channel.send(cows()[random], { code: ''});
        
    }
}