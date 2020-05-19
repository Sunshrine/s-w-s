module.exports = {
    name: 'zodiac',
    description: 'Gives a zodiac sign for the given month and date',
    category: 'general',
    usage: '<month in numbers <date>',
    run: async (client, message, args) => {
        message.delete()
        const month = parseInt(args[0]);
        const day = parseInt(args[1]);

        if (!month) {
            return message.channel.send('Please enter a valid number for month.').then(m => m.delete({ "timeout": 1500 }))
        }

        if (month < 1 || month > 12) {
            return message.channel.send('Please enter a valid month [1, 12].').then(m => m.delete({ "timeout": 1500 }))
        }

        if (!day) {
            return message.channel.send('Please enter a valid number for day.').then(m => m.delete({ "timeout": 1500 }))
        }

        if (month === 1) {
            if (day >= 1 && day <= 19) return message.channel.send('Your zodiac is Capricorn ♑.');
			if (day >= 20 && day <= 31) return message.channel.send('Your zodiac is Aquarius ♒.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 2) {
			if (day >= 1 && day <= 18) return message.channel.send('Your zodiac is Aquarius ♒.');
			if (day >= 19 && day <= 29) return message.channel.send('Your zodiac is Pisces ♓.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 3) {
			if (day >= 1 && day <= 20) return message.channel.send('Your zodiac is Pisces ♓.');
			if (day >= 21 && day <= 31) return message.channel.send('Your zodiac is Aries ♈.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 4) {
			if (day >= 1 && day <= 19) return message.channel.send('Your zodiac is Aries ♈.');
			if (day >= 20 && day <= 31) return message.channel.send('Your zodiac is Taurus ♉.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 5) {
			if (day >= 1 && day <= 20) return message.channel.send('Your zodiac is Taurus ♉.');
			if (day >= 21 && day <= 31) return message.channel.send('Your zodiac is Gemini ♊.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 6) {
			if (day >= 1 && day <= 20) return message.channel.send('Your zodiac is Gemini ♊.');
			if (day >= 21 && day <= 31) return message.channel.send('Your zodiac is Cancer ♋.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 7) {
			if (day >= 1 && day <= 22) return message.channel.send('Your zodiac is Cancer ♋.');
			if (day >= 23 && day <= 31) return message.channel.send('Your zodiac is Leo ♌.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 8) {
			if (day >= 1 && day <= 22) return message.channel.send('Your zodiac is Leo ♌.');
			if (day >= 23 && day <= 31) return message.channel.send('Your zodiac is Virgo ♍.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 9) {
			if (day >= 1 && day <= 22) return message.channel.send('Your zodiac is Virgo ♍.');
			if (day >= 23 && day <= 31) return message.channel.send('Your zodiac is Libra ♎.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 10) {
			if (day >= 1 && day <= 22) return message.channel.send('Your zodiac is Libra ♎.');
			if (day >= 23 && day <= 31) return message.channel.send('Your zodiac is Scorpio ♏.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 11) {
			if (day >= 1 && day <= 21) return message.channel.send('Your zodiac is Scorpio ♏.');
			if (day >= 22 && day <= 31) return message.channel.send('Your zodiac is Sagittarius ♐.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else if (month === 12) {
			if (day >= 1 && day <= 21) return message.channel.send('Your zodiac is Sagittarius ♐.');
			if (day >= 22 && day <= 31) return message.channel.send('Your zodiac is Capricorn ♑.');
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
        } 
        else {
			return message.channel.send('Please enter a valid date.').then(m => m.delete({ "timeout": 1500 }))
		}


    },
};