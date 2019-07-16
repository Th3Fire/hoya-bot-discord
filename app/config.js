const constants = require('./constants')
const { key } = require('./key/sim-key.json')

module.exports = {
    token: process.env.BOT_TOKEN || "",
    mainChannelIDChatbot: process.env.DISCORD_CHANNEL_ID || "",
    simsimiOption: {
        lc: process.env.SIM_LC || "th",
        ft: process.env.SIM_FT || "0.0",
        key: process.env.SIM_KEY || key || ""
    },
    prefix: process.env.PREFIX || "!",
    ownerBotID: process.env.OWNER_BOT_ID || "",
    activity: process.env.BOT_ACTIVITY || "",
    multiChannel: process.env.MULTI_CHANNEL || "N",
    botChannelName: process.env.CHANNEL_NAME || "chat-bot",
    whitelistedRoleId: process.env.WHITELISTED_ROLE_ID || "",
}

