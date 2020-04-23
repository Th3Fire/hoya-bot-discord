module.exports = {
	name: 'server',
	guildOnly: true,
	description: 'แสดงข้อมูลเกี่ยวกับเซิร์ฟเวอร์นี้',
	cooldown: 30,
	execute(message) {
		message.channel.send(`🖥️ ชื่อเซิร์ฟเวอร์: ${message.guild.name}\n👥 สมาชิกทั้งหมด: ${message.guild.memberCount}`)
	},
}