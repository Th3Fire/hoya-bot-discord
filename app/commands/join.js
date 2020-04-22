module.exports = {
	name: 'join',
	guildOnly: true,
	description: 'เข้าร่วม voice channel',
	cooldown: 10,
	async execute(message) {
        try {
            const connection = await message.member.voice.channel.join()
        } catch (error) {
            console.error(error)
            return
        }
	},
}