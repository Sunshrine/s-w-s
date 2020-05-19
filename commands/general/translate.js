module.exports = {
  name: 'translate',
  description: 'Translate from a language to another!',
  category: 'general',
  aliases: ['googletranslate', 'google-translate'],
  usage: '<target language> <text>',
  run: async (client, message, args) => {
    
const { MessageEmbed } = require('discord.js');
const yandex_API = process.env.YANDEXKEY
const ISO6391 = require('iso-639-1');
const fetch = require('node-fetch');


        let list = "Azerbaijan,	Malayalam, Albanian, Maltese, Amharic, Macedonian, English,	Maori, Arabic, Marathi, Armenian, Mari, Afrikaans, Mongolian, Basque, German, Bashkir, Nepali, Belarusian, Norwegian, Bengali, Punjabi, Burmese, Papiamento, Bulgarian, Persian, Bosnian, Polish, Welsh, Portuguese, Hungarian, Romanian, Vietnamese, Russian, Haitian (Creole), Cebuano, Galician,	Serbian, Dutch,	Sinhala, Hill Mari,	Slovakian, Greek, Slovenian, Georgian, Swahili, Gujarati, Sundanese, Danish, Tajik, Hebrew, Thai, Yiddish, Tagalog, Indonesian, Tamil, Irish, Tatar, Italian, Telugu, Icelandic, Turkish, Spanish, Udmurt, Kazakh, Uzbek, Kannada, Ukrainian, Catalan, Urdu, Kyrgyz, Finnish, Chinese, French, Korean, Hindi, Xhosa, Croatia, Khmer,	Czech, Laotian, Swedish, Latin,	Scottish, Latvian, Estonian, Lithuanian, Esperanto, Luxembourgish, Javanese, Malagasy, Japanese, Malay"
        
        if (!args[0]) return message.channel.send("Type A Language to translate")

        const langCode = ISO6391.getCode(args[0]);
        const langName = ISO6391.getName(langCode)
        if (langCode === '') {
            const sentMessage2 = new MessageEmbed()
            .setColor("GREEN")
            .setDescription("**This Language is Not Supported!**")
        const sentMessage = await message.channel.send(sentMessage2)

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("List Of Supported Languages!")
                .setThumbnail(message.guild.iconURL())
                .addField('**These Are The Supported Languages!**', list)
            return sentMessage.edit(embed);
        };
    
            if (args.length < 2) {
            message.reply(`USE THE CORRECT FORMAT: &translate <target language> <text>`);
        } 


          
            let text = args.slice(1).join(' ')
            
                    try {
            var res = await fetch(
                `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandex_API}&text=${encodeURI(
                    text
                )}&lang=${langCode}`
            );
            const json = await res.json();
            message.channel.send(embedTranslation(json.text[0]));
        } catch (e) {
                    console.log(e)
            const sembed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription('**Something Went Wrong While Trying To Translate The Text!**')
            return message.channel.send(sembed1);
        };

        function embedTranslation(text) {
            return new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Translated To ${langName}`)
                .setDescription(`${text}`)
                .setFooter(message.guild.name, message.guild.iconURL());
        }
    
  }
}