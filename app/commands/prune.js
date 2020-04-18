const constants = require('../constants')

module.exports = {
	name: 'prune',
    description: 'Purge up to 99 messages.',
    guildOnly: true,
    usage: '[number between 1 - 30]',
	execute(message, args) {
		const hasPermission = message.member.hasPermission([constants.ADMINISTRATOR])
        if (!hasPermission) {
            return message.reply("You haven't permission to use this command.")            
        }

        const amount = parseInt(args[0])

        if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.')
		} else if (amount <= 1 || amount > 30) {
			return message.reply('you need to input a number between 1 and 30.')
        }
        
        message.guild.members.prune({ days: amount, dry: true, reason: `Pruned by ${message.author.username}` })
        .then(pruned => {
            return message.reply(`ลบ member จำนวน ${pruned} คน ออกจากห้อง ${message.guild.name} เนื่องจากไม่ออนไลน์ในระยะเวลา ${amount} วัน`)
        })
        .catch(error => {
            console.error(error)
            message.channel.send('there was an error trying to prune members in this channel!')
        })
	},
}