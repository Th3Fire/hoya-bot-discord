const constants = require('../constants')
const db = require('../../models/index');
const vcGroup = require('../constants/vcGroup')
module.exports = {
	name: 'vc',
	description: `Set up auto create voice channel (for admin only)`,
	guildOnly: true,
	args: true,
	usage: `[setup | ${Object.keys(vcGroup).join(',').toLowerCase()} : default is general (optional)`,
	cooldown: 5,
	execute(message, args) {
		// Check KICK permission
		const hasPermission = message.member.hasPermission([constants.ADMINISTRATOR])
		if (!hasPermission) return message.reply("ขออภัย คุณไม่มีสิทธิ์ใช้งานคำสั่งนี้ เฉพาะแอดมินเท่านั้น!")
		
		let group = vcGroup.GENERAL
		if (args.length >= 2) {
			group = vcGroup[args[1].toUpperCase()] ?
				vcGroup[args[1].toUpperCase()]:
				vcGroup.GENERAL
		}

		message.guild.channels.create(group.categoryName, {
			type: 'category'
		}).then((category) => {
			console.log(`[log]: category has been created id:${category.id} name: ${category.name}`)
			const defaultVoiceChannel = '➕กดเพื่อสร้างห้อง➕'
			message.guild.channels.create(defaultVoiceChannel, {
				type: 'voice',
				parent: category.id
			}).then(voiceChannel => {
				console.log(`[log]: auto voice channel has been created id:${voiceChannel.id} name: ${voiceChannel.name}`)
				db.VoiceChannel.findOrCreate({
						where: {
							guildID: message.guild.id,
							channelID: voiceChannel.id,
							category: group.categoryId.toUpperCase()
						}
					}).then(([vcObj, created]) => {
						console.log(created)
						return message.reply(`\nน้องบอททำการสร้าง Auto Voice Channel เรียบร้อยแล้ว\nCategory: ${category}\nVoice Channel: ${defaultVoiceChannel}`)
					})
					.catch(error => console.error('dbError: ', error))
			})
		}).catch((error) => console.error(error))
	},
}