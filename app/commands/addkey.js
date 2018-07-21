const config = require('../config')
const path = require('path');
const fs = require("fs");
const { isEmpty } = require('ramda')

const appDir = path.dirname(require.main.filename);

exports.run = async (client, message, args) => {
    const hasPermission = message.member.id === config.ownerBotID
    if (!hasPermission) 
        return message.reply("You haven't permission to use this command.")

    if (isEmpty(args))
        return message.reply("โปรดระบุ Simsimi Key")

    let data = { key: args[0] }
    fs.writeFile(appDir + '/key/sim-key.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err)
            return message.reply("อัพเดต Simsimi Key ไม่สำเร็จ")
        }
        return message.reply("อัพเดต Simsimi Key เรียบร้อย")
    })
}