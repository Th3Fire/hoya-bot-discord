const Simsimi = require('simsimi');
const chalk = require('chalk');
const config = require('./config')
const { author } = require('../package.json');
const { simsimiOption } = config
const simsimi = new Simsimi(simsimiOption);

module.exports = {
    simsimi: (message) => {
        simsimi.listen(message.content, function (err, msg) {
            if (err) {
                if (err.result === 509) {
                    message.reply(`คีย์ Simsimi หมดอายุแล้ว เรียก ${author} ให้โหน่ยยยย...`);
                }
                return console.log(chalk.hex('#ff0000')(`error result : ${err.result}, message: ${err.msg}`));
            }
            message.reply(msg);
            console.log(chalk.hex('#fcfc20')('simsimi say : ') + chalk.hex('#fc2065')(msg))
        });
    },
    getDefaultChannel: (guild) => {
        if (guild.channels.has(guild.id))
            return guild.channels.get(guild.id)
        if (guild.channels.exists("name", "general")) {
            return guild.channels.find("name", "general");
        }
        return guild.channels
            .filter(c => c.type === "text" &&
                c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
            .sort((a, b) => a.position - b.position ||
                Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
            .first();
    },
    getBotChannel: (guild) => {
        if (guild.channels.has(guild.id))
            return guild.channels.get(guild.id)
        if (guild.channels.exists("name", "chat-bot")) {
            return guild.channels.find("name", "chat-bot");
        }
        return guild.channels
            .filter(c => c.type === "text" &&
                c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
            .sort((a, b) => a.position - b.position ||
                Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
            .first();
    },
    getLogChannel: (guild) => {
        // if (guild.channels.has(guild.id))
        //     return guild.channels.get(guild.id)
        if (guild.channels.exists("name", "bot-log")) {
            return guild.channels.find("name", "bot-log");
        }
        return guild.channels
            .filter(c => c.type === "text" &&
                c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
            .sort((a, b) => a.position - b.position ||
                Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
            .first();
    },
}