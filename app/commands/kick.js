const { isEmpty } = require('ramda')
const constants = require('../constants')
exports.run = async (client, message, [mention, ...reason]) => {
    const hasPermission = message.member.hasPermission([constants.KICK_MEMBERS], false, true)
    if (!hasPermission)
        return message.reply("You haven't permission to use this command.")

    if (message.mentions.members.size === 0)
        return message.reply("Please mention a user to kick");

    const kickMember = message.mentions.members.first();

    if (!kickMember.kickable) {
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    }

    kickMember.kick(isEmpty(reason) ? "No reason provided" : reason.join(" ")).then(member => {
        console.log(`user ${message.member.user.username} was kicked ${kickMember.user.username}`)
        message.reply(`${member.user.username} was succesfully kicked.`);
    }).catch( (err) => console.error(err));

}