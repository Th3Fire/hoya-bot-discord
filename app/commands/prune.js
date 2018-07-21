const R = require('ramda')
const constants = require('../constants')
exports.run = async (client, message, days) => {
    const hasPermission = message.member.hasPermission([constants.ADMINISTRATOR], false, true)
    if (!hasPermission)
        return message.reply("You haven't permission to use this command.")

    const daysToInt = parseInt(days[0])
    const isNumber = R.both(R.is(Number), R.complement(R.equals(NaN)))(daysToInt)
    if (!isNumber)
        return message.reply("จำนวนวันต้องเป็นตัวเลขและอยู่ระหว่าง 1 ถึง 30")
    if (daysToInt < 1 || daysToInt > 30)
        return message.reply("โปรดระบุจำนวนวันระหว่าง 1 ถึง 30")
    try {
        const daysInt = parseInt(daysToInt)
        daysInt && message.guild.pruneMembers(daysInt, false)
            .then(pruned => {
                console.log(`ลบ member จำนวน ${pruned} คน ออกจากห้อง ${message.guild.name} เนื่องจากไม่ออนไลน์ในระยะเวลา ${days[0]} วัน`)
                return message.reply(`ลบ member จำนวน ${pruned} คน ออกจากห้อง ${message.guild.name} เนื่องจากไม่ออนไลน์ในระยะเวลา ${days[0]} วัน`)
            })
            .catch(console.error);
    } catch (err) {
        console.log(err)
    }

}