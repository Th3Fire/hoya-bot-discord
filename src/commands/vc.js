const constants = require('../constants')
const db = require('../../models/index');

module.exports = {
	name: 'vc',
	guildOnly: true,
    description: 'auto create voice channel',
    usage: '[group name | optional]',
    cooldown: 5,
	execute(message, args) {
        // Check KICK permission
        const hasPermission = message.member.hasPermission([constants.ADMINISTRATOR])
        if (!hasPermission) return message.reply("ขออภัย คุณไม่มีสิทธิ์ใช้งานคำสั่งนี้ เฉพาะแอดมินเท่านั้น!")

        message.guild.channels.create('🔊 Default Category 🔊', {
            type: 'category'
        }).then((category) => {
            console.log(`[log]: category has been created id:${category.id} name: ${category.name}`)
            message.guild.channels.create('Join to create a channel', {
                type: 'voice',
                parent: category.id
            }).then(voiceChannel => {
                console.log(`[log]: auto voice channel has been created id:${voiceChannel.id} name: ${voiceChannel.name}`)
                db.VoiceChannel.findOrCreate({
                    where: { 
                        guildID: message.guild.id,
                        channelID: voiceChannel.id
                    }
                }).then(([vcObj, created]) => {
                    console.log(created)
                })
                .catch(error => console.error('dbError: ', error))
            })
            
        }).catch((error) => console.error(error))
	},
}