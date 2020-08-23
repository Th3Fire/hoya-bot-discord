module.exports = {
	name: 'leave',
	guildOnly: true,
	description: 'ออกจาก voice channel',
	aliases: ['หยุด', 'stop'],
	inactive: true,
	cooldown: 10,
	async execute(message) {
		try {
			const connection = await message.member.voice.channel.join()
			return connection.disconnect()
		} catch (error) {
			return console.error(error)
		}
	},
}