const { prefix } = require('../config')
module.exports = {
	name: 'help',
	description: 'แสดงรายการคำสั่งหรือข้อมูลทั้งหมดเกี่ยวกับคำสั่งเฉพาะ',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = []
		const { commands } = message.client

		if (!args.length) {
			data.push('📝นี่คือรายการคำสั่งทั้งหมดของฉัน📝')
			data.push(commands.map(command => command.name).join(', '))
			data.push(`\nคุณสามารถใช้งานคำสั่ง \`${prefix}help [command name]\` เพื่อรับข้อมูลเกี่ยวกับคำสั่งเฉพาะ!`)

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return
					message.reply('ฉันได้ส่งรายการคำสั่งทั้งหมดให้คุณทาง DM แล้ว!')
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
					message.reply('ดูเหมือนว่าฉันจะไม่สามารถ DM ถึงคุณได้!')
				})
		}

		const name = args[0].toLowerCase()
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

		if (!command) {
			return message.reply('นั่นไม่ใช่คำสั่งที่ถูกต้อง!')
		}

		data.push(`**ชื่อคำสั่ง:** ${command.name}`)

		if (command.aliases) data.push(`**นามแฝง:** ${command.aliases.join(', ')}`)
		if (command.description) data.push(`**รายละเอียด:** ${command.description}`)
		if (command.usage) data.push(`**การใช้งาน:** ${prefix}${command.name} ${command.usage}`)

		data.push(`**คูลดาวน์:** ${command.cooldown || 3} วินาที`)

		message.channel.send(data, { split: true })
	},
}