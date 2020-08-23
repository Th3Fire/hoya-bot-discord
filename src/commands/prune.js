const constants = require('../constants')

module.exports = {
	name: 'prune',
	description: 'ล้างสมาชิกที่ไม่ได้ออนไลน์ (สูงสุด 30 วัน/ครั้ง)',
	guildOnly: true,
	args: true,
	usage: '[number between 1 - 30]',
	execute(message, args) {
		const hasPermission = message.member.hasPermission([constants.ADMINISTRATOR])
		if (!hasPermission) {
			return message.reply("ขออภัย คุณไม่มีสิทธิ์ใช้งานคำสั่งนี้!")
		}

		const amount = parseInt(args[0])

		if (isNaN(amount)) {
			return message.reply('โปรดระบุจำนวนวันเป็นตัวเลข!')
		} else if (amount <= 1 || amount > 30) {
			return message.reply('โปรดระบุตัวเลขระหว่าง 1 - 30')
		}

		message.guild.members.prune({
				days: amount,
				dry: true,
				reason: `Pruned by ${message.author.username}`
			})
			.then(pruned => {
				return message.reply(`ลบสมาชิกจำนวน ${pruned} คน ออกจากเซิร์ฟเวอร์ ${message.guild.name} เนื่องจากไม่ออนไลน์ในระยะเวลา ${amount} วัน`)
			})
			.catch(error => {
				console.error(error)
				message.reply(`ขออภัย ${message.author.username} น้องบอทไม่สามารถลบสมาชิกได้เนื่องจาก : ${error}`)
			})
	},
}