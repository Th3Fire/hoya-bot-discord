module.exports = {
	name: 'reload',
	description: 'โหลดคำสั่งใหม่',
    args: true,
    usage: '[command name]',
	execute(message, args) {
		const commandName = args[0].toLowerCase()
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

		if (!command) {
			return message.channel.send(`ไม่พบคำสั่งที่ใช้ชื่อหรือนามแฝง \`${commandName}\`, ${message.author}!`)
		}

		delete require.cache[require.resolve(`./${command.name}.js`)]

		try {
			const newCommand = require(`./${command.name}.js`)
			message.client.commands.set(newCommand.name, newCommand)
		} catch (error) {
			console.log(error)
			return message.channel.send(`มีข้อผิดพลาดขณะโหลดคำสั่ง \`${command.name}\`:\n\`${error.message}\``)
		}
		message.channel.send(`คำสั่ง \`${command.name}\` ถูกโหลดใหม่สำเร็จ!`)
	},
}