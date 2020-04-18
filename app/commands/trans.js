const { Translate } = require('@google-cloud/translate').v2

const translate = new Translate()

module.exports = {
	name: 'trans',
    description: 'Translation any language to Thai',
    args: true,
	aliases: ['แปล'],
	usage: '[vocabulary or sentence]',
    cooldown: 5,
    async execute(message, args) {
        const [translation] = await translate.translate(args[0], 'th')
        return message.reply(translation)
    }
}