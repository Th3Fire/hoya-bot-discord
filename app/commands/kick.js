const constants = require('../constants')
exports.run = (client, message, [mention, ...reason]) => {
    let hasPermission = message.member.hasPermission([constants.KICK_MEMBERS], false, true)
    if (!hasPermission)
        return message.reply("You haven't permission to use this command.")

    if (message.mentions.members.size === 0)
        return message.reply("Please mention a user to kick");

    const kickMember = message.mentions.members.first();

    kickMember.kick(reason.join(" ")).then(member => {
        message.reply(`${member.user.username} was succesfully kicked.`);
    }).catch( (err) => console.error(err));

}