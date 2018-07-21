const constants = require('../constants')
const { isEmpty } = require('ramda')

exports.run = async (client, message, [mention, ...reason]) => {
  const hasPermission = message.member.hasPermission([constants.BAN_MEMBERS], false, true)
  if (!hasPermission) {
    return message.reply("Sorry, you don't have permissions to use this!");
  }

  let banMember = message.mentions.members.first();
  if (!banMember)
    return message.reply("Please mention a valid member of this server");
  if (!banMember.bannable)
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  const bannedReason = isEmpty(reason) ? "No reason provided" : reason.join(" ")
  await banMember.ban(bannedReason)
    .then((member) => {
      console.log(`user ${member.user.tag} has been banned by ${message.author.tag}`)
      message.reply(`${member.user.username} has been banned by ${message.author.username} because: ${bannedReason}`);
    })
    .catch(error => message.reply(`Sorry ${message.author.username} I couldn't ban because of : ${error}`));
}