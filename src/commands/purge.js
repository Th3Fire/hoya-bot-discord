const constants = require('../constants')

module.exports = {
	name: 'purge',
	description: 'ลบข้อความสนทนา (สูงสุด 99 ข้อความ/ครั้ง)',
	guildOnly: true,
	args: true,
	usage: '[number between 1 - 99]',
	execute(message, args) {
		const hasPermission = message.member.hasPermission([constants.ADMINISTRATOR])
		if (!hasPermission) {
			return message.reply("ขออภัย คุณไม่มีสิทธิ์ใช้งานคำสั่งนี้!")
		}

		const amount = parseInt(args[0]) + 1

		if (isNaN(amount)) {
			return message.reply('โปรดระบุจำนวนเป็นตัวเลข!')
		} else if (amount <= 1 || amount > 100) {
			return message.reply('โปรดระบุตัวเลขระหว่าง 1 - 99')
		}

		message.channel.bulkDelete(amount, true).catch(error => {
			console.error(error)
			message.reply(`ขออภัย ${message.author.username} น้องบอทไม่สามารถลบข้อความได้เนื่องจาก : ${error}`)
		})
	},
}