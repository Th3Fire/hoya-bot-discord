const { isEmpty } = require('ramda')
const constants = require('../constants')
exports.run = async (client, message, [mention, ...reason]) => {
    const hasPermission = message.member.hasPermission([constants.KICK_MEMBERS], false, true)
    if (!hasPermission)
        return message.reply("You haven't permission to use this command.")

    let kickMember = message.mentions.members.first();
    if (!kickMember)
        return message.reply("Please mention a user to kick");
    if (!kickMember.kickable) {
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    }

    const kickedReason = isEmpty(reason) ? "No reason provided" : reason.join(" ")
    await kickMember.kick(kickedReason)
        .then(member => {
            console.log(`user ${member.user.tag} has been kicked by ${message.author.tag}`)
            message.reply(`${member.user.username} has been kicked by ${message.author.username} because: ${kickedReason}`);
        }).catch((err) => console.error(err));

}