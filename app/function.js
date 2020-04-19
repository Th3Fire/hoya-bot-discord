// const Simsimi = require('simsimi');
const chalk = require('chalk');
const { simsimi } = require('./simsimi')

module.exports = {
    simsimi: async (message) => {
        const { atext: response } = await simsimi(message.content)
        try {
            console.log(chalk.hex('#03a9fc')(`${message.author.username} say : `) + chalk.hex('#03a9fc')(message.content))
            console.log(chalk.hex('#fc2065')('simsimi say : ') + chalk.hex('#fc2065')(response))
            return response && message.reply(response)
        } catch (error) {
            return console.log(chalk.hex('#ff0000')('error result: ', error))
        }
    },
    getDefaultChannel: (guild) => {
        // console.log('guild.channels: ', guild.channels)
        // if (guild.channels.has(guild.id))
        //     return guild.channels.get(guild.id)
        // if (guild.channels.exists("name", "general")) {
        //     return guild.channels.find("name", "general");
        // }
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
