const constants = require('../constants')

module.exports = {
	name: 'purge',
	description: 'Purge up to 99 messages.',
	guildOnly: true,
    usage: '[number between 1 - 99]',	
	execute(message, args) {
		const hasPermission = message.member.hasPermission([constants.ADMINISTRATOR])
        if (!hasPermission) {
            return message.reply("You haven't permission to use this command.")            
		}
		
		const amount = parseInt(args[0]) + 1

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.')
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.')
		}

		message.channel.bulkDelete(amount, true).catch(error => {
			console.error(error)
			message.channel.send('there was an error trying to prune messages in this channel! Do I have manage message permission?')
		})
	},
}