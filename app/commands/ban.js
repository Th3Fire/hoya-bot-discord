const constants = require('../constants')

module.exports = {
	name: 'ban',
	description: 'Mention a member and ban them.',
  guildOnly: true,
  aliases: ['แบน'],
  usage: '[mention member]',
	execute(message, args) {
    // Check BAN permission
    const hasPermission = message.member.hasPermission([constants.BAN_MEMBERS])
    if (!hasPermission) {
      return message.reply("Sorry, you don't have permissions to use this!")
    }

		let banMember = message.mentions.members.first();
    if (!banMember) {
      return message.reply("Please mention a valid member of this server")
    }
    if (!banMember.bannable) {
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?")
    }

    const bannedReason = args ? args.join(" ") : "No reason provided" 
    banMember.ban(bannedReason)
      .then((member) => {
        message.reply(`${member.user.username} has been banned by ${message.author.username} because: ${bannedReason}`)
      })
      .catch(error => {
        console.error(error)
        message.reply(`Sorry ${message.author.username} I couldn't ban because of : ${error}`)
      })
	},
}