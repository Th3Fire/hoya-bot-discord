const Discord = require('discord.js')
const { Translate } = require('@google-cloud/translate').v2

const translate = new Translate()

module.exports = {
	name: 'trans',
    description: 'แปลภาษา -> ภาษาไทย',
    args: true,
	aliases: ['แปล'],
	usage: '[text]',
    cooldown: 5,
    async execute(message, args) {
        const text = args.join(' ')
        const [translation] = await translate.translate(text, 'th')
        const textEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Translation - แปลภาษา')
            .setDescription('ข้อความถูกแปลภาษาเป็น 🇹🇭')
            .setThumbnail('http://icons.iconarchive.com/icons/marcus-roberto/google-play/256/Google-Translate-icon.png')
            .addFields(
                { name: 'ข้อความเดิม', value: text },
                { name: 'ข้อความที่ถูกแปล', value: translation },
            )
            .setTimestamp()
            .setFooter('translated by Google', 'https://img.icons8.com/color/50/000000/google-logo.png')

        return message.reply(textEmbed)
    }
}