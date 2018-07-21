const constants = require('./constants')
module.exports = {
    token: process.env.BOT_TOKEN || "",
    channelChatbotId: process.env.DISCORD_CHANNEL_ID || "",
    simsimiOption: {
        lc: process.env.SIM_LC || "th",
        ft: process.env.SIM_FT || "0.0",
        key: process.env.SIM_KEY || ""
    },
    prefix: process.env.PREFIX || "!",
    ownerBotRole: [constants.MANAGE_CHANNELS],
    activity: process.env.BOT_ACTIVITY || ""
}
