const constants = require('./constants')
const { key } = require('./key/sim-key.json')

module.exports = {
    token: process.env.BOT_TOKEN || "NDcwMjk3NTQ0NDMwMTkwNjEy.XYSpxg.ajuOzp22KhnfG6WLgo8nrZsXHlU",
    mainChannelIDChatbot: process.env.DISCORD_CHANNEL_ID || "",
    simsimiOption: {
        lang: process.env.SIM_LC || "th",
        key: process.env.SIM_KEY || key || "",
        filter: process.env.FILTER || '1.0'
    },
    prefix: process.env.PREFIX || "!",
    ownerBotID: process.env.OWNER_BOT_ID || "",
    activity: process.env.BOT_ACTIVITY || "",
    multiChannel: process.env.MULTI_CHANNEL || "N",
    botChannelName: process.env.CHANNEL_NAME || "chat-bot",
    whitelistedRoleId: process.env.WHITELISTED_ROLE_ID || "",
}

