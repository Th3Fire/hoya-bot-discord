module.exports = {
	name: 'join',
	guildOnly: true,
    description: 'เข้าร่วม voice channel',
    inactive: true,
	cooldown: 10,
	async execute(message) {
        try {
            await message.member.voice.channel.join()
        } catch (error) {
            console.error(error)
            return
        }
	},
}