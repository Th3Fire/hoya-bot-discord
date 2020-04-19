const constants = require('../constants')

module.exports = {
	name: 'kick',
	description: 'เตะสมาชิกออกจากเซิร์ฟเวอร์',
    guildOnly: true,
    aliases: ['เตะ'],
    usage: '[mention member]',
	execute(message, args) {
        // Check KICK permission
        const hasPermission = message.member.hasPermission([constants.KICK_MEMBERS])
        if (!hasPermission)
            return message.reply("ขออภัย คุณไม่มีสิทธิ์ใช้งานคำสั่งนี้!")

        let kickMember = message.mentions.members.first()
        if (!kickMember)
            return message.reply("โปรดระบุสมาชิกที่ต้องการเตะ")
        if (!kickMember.kickable) {
            return message.reply("ฉันไม่สามารถเตะผู้ใช้รายนี้ได้")
        }

        const kickedReason = args ? args.join(" ") : "ไม่ระบุ" 
        kickMember.kick(kickedReason)
            .then(member => {
                message.reply(`${member.user.username} ถูกเตะโดย ${message.author.username} สาเหตุ: ${kickedReason}`)
            }).catch((error) => {
                console.error(error)
                message.reply(`ขออภัย ${message.author.username} ฉันไม่สามารถเตะได้เพราะ : ${error}`)
            })
	},
}