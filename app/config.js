const constants = require('./constants')
module.exports = {
    token: process.env.BOT_TOKEN || "",
    channelChatbotId: process.env.DISCORD_CHANNEL_ID || "",
    simsimiOption: {
        lc: process.env.SIM_LC || "",
        ft: process.env.SIM_FT || "",
        key: process.env.SIM_KEY || ""
    },
    prefix: process.env.PREFIX || "!",
    ownerBotRole: [constants.MANAGE_CHANNELS]
}