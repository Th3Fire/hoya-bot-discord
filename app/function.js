// const Simsimi = require('simsimi');
const chalk = require('chalk');
const config = require('./config')
const { author } = require('../package.json');
const { simsimi } = require('./simsimi')
const { simsimiOption } = config
// const SimBot = Simsimi(simsimiOption);

module.exports = {
    simsimi: async (message) => {
        const { atext: response } = await simsimi(message.content)
        try {
            console.log(chalk.hex('#fcfc20')('simsimi say : ') + chalk.hex('#fc2065')(response))
            return message.reply(response)
        } catch (error) {
            return console.log(chalk.hex('#ff0000')('error result: ', error))
        }
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
