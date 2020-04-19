const constants = require('../constants')

module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them (but not really).',
    guildOnly: true,
    aliases: ['เตะ'],
    usage: '[mention member]',
	execute(message, args) {
        const hasPermission = message.member.hasPermission([constants.KICK_MEMBERS])
        if (!hasPermission)
            return message.reply("You haven't permission to use this command.")

        let kickMember = message.mentions.members.first()
        if (!kickMember)
            return message.reply("Please mention a user to kick")
        if (!kickMember.kickable) {
            return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?")
        }

        const kickedReason = args ? args.join(" ") : "No reason provided" 
        kickMember.kick(kickedReason)
            .then(member => {
                message.reply(`${member.user.username} has been kicked by ${message.author.username} because: ${kickedReason}`)
            }).catch((error) => {
                console.error(error)
                message.reply(`Sorry ${message.author.username} I couldn't kick because of : ${error}`)
            })
	},
}