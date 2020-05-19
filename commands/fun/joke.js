const request = require('superagent');

module.exports = {
    name: 'joke',
    desciprtion: 'tells a joke about someone',
    usage: '[name of the person you want to make fun of]',
    category: 'fun',
    run: async (client, message, args) => { 

        message.delete()

        let firstName = args[0];
        let lastName = args[1];

        if (!firstName) return message.channel.send('GIVE ME A FIRST LAST NAME BISH!!');
        if (!lastName) return message.channel.send('GIVE ME A LAST NAME BISH!!');

        request.get('http://api.icndb.com/jokes/random')
            .query({escape: 'javascript'})
            .query({firstName: firstName})
            .query({lastName: lastName})
            .end((err, res) => {
                if (!err && res.status === 200) {
                    message.channel.send(res.body.value.joke)
                } else {
                    console.error(`REST call failed: ${err}`)
                }
            });
    }

}