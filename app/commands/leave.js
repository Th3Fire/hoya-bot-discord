module.exports = {
	name: 'leave',
	guildOnly: true,
	description: 'ออกจาก voice channel',
	cooldown: 10,
	async execute(message) {
        try {
            const connection = await message.member.voice.channel.join()
            connection.disconnect()
        } catch (error) {
            console.error(error)
            return
        }
	},
}