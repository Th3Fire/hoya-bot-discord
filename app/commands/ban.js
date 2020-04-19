const constants = require('../constants')

module.exports = {
	name: 'ban',
	description: 'แบนสมาชิกออกจากเซิร์ฟเวอร์',
  guildOnly: true,
  aliases: ['แบน'],
  usage: '[mention member]',
	execute(message, args) {
    // Check BAN permission
    const hasPermission = message.member.hasPermission([constants.BAN_MEMBERS])
    if (!hasPermission) {
      return message.reply("ขออภัย คุณไม่มีสิทธิ์ใช้งานคำสั่งนี้!")
    }

		let banMember = message.mentions.members.first();
    if (!banMember) {
      return message.reply("โปรดระบุสมาชิกที่ต้องการแบน")
    }
    if (!banMember.bannable) {
      return message.reply("ไม่สามารถแบนผู้ใช้รายนี้ได้!")
    }

    const bannedReason = args ? args.join(" ") : "ไม่ระบุ" 
    banMember.ban(bannedReason)
      .then((member) => {
        message.reply(`${member.user.username} ถูกแบนโดย ${message.author.username} สาเหตุ: ${bannedReason}`)
      })
      .catch(error => {
        console.error(error)
        message.reply(`ขออภัย ${message.author.username} น้องบอทไม่สามารถแบนได้เนื่องจาก : ${error}`)
      })
	},
}